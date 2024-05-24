import 'express-async-errors'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'

import { isProd, NODE_ENV, PORT, MONGO_URI } from './config.js'

import { errorHandler, unknownEndpoint, limiter } from './utils/middleware.js'
import movieRouter from './routes/movie.routes.js'

const startServer = () => {
    const app = express()

    console.log('NODE_ENV', NODE_ENV)

    app.enable('trust proxy')
    app.use(limiter(15, 200))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    // Configure CORS
    app.use(
        cors({
            origin: isProd ? PUBLIC_DOMAIN : 'http://localhost:5173', // TODO: Replace with React app's origin
            credentials: true,
        })
    )
    app.use(morgan(!isProd ? 'tiny' : 'dev'))
    app.use(helmet())

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

    app.use(errorHandler)
    app.use(unknownEndpoint)

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
}

startServer()
