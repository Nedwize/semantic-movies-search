import 'express-async-errors'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

import { isProd, NODE_ENV, PORT, MONGO_URI } from './config.js'

import { errorHandler, unknownEndpoint, limiter } from './utils/middleware.js'
import movieRouter from './routes/movie.routes.js'
import Chroma from './utils/chroma.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const startServer = async () => {
    const app = express()

    console.log('NODE_ENV', NODE_ENV)

    // app.enable('trust proxy')
    app.use(limiter(15, 200))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    // Configure CORS
    app.use(
        cors({
            origin: 'http://localhost:3030', // TODO: Replace with React app's origin
            credentials: true,
        })
    )
    app.use(morgan(!isProd ? 'tiny' : 'dev'))
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    imgSrc: [
                        "'self'",
                        'data:',
                        'https://via.placeholder.com',
                        'https://m.media-amazon.com',
                    ],
                    defaultSrc: ["'self'"],
                    connectSrc: ["'self'", CONFIG.PH_HOST],
                },
            },
        })
    )

    try {
        await Chroma.initWRetry()
    } catch (e) {
        console.log(e)
        console.log(`Could not connect to ChromaDB. Err: ${e?.message}`)
    }

    mongoose
        .connect(MONGO_URI)
        .then(() => console.log('🛢 Connected to MongoDB'))
        .catch((err) => {
            console.log('🛢 Error connecting to MongoDB:', err.message)
            console.log('☠️ Shutting down the server')
            process.exit(0)
        })

    app.get('/health', (_, res) => {
        res.status(200).json({ message: 'ok' })
    })

    app.use('/api/movies', movieRouter)

    if (isProd) {
        console.log('📂 Serving static files')
        // Serve frontend files
        app.use(express.static(path.join(__dirname, './client/build'))) // This is according to the docker file and not the current structure

        // Catch all other routes and serve frontend
        app.get('*', (_, res) => {
            res.sendFile(path.join(__dirname, './client/build/index.html')) // This is according to the docker file and not the current structure
        })
    }

    app.use(errorHandler)
    app.use(unknownEndpoint)

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
}

startServer()
