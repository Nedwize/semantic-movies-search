import { Router } from 'express'
import MovieService from '../services/movie.service.js'

const movieRouter = Router()

movieRouter.get('/search', async (req, res) => {
    const q = req.query.q?.toString() || ''
    if (!q) return res.status(200).json({ success: true, movies: [] })

    const films = await MovieService.FindMovieByKeyword(q)
    res.status(200).json({ success: true, movies: films })
})

movieRouter.get('/cool-search', async (req, res) => {
    const q = req.query.q?.toString() || ''
    if (!q) return res.status(200).json({ success: true, movies: [] })

    const films = await MovieService.FindMovieBySemantics(q)
    res.status(200).json({ success: true, movies: films })
})

movieRouter.post('/feed', async (_, res) => {
    MovieService.FeedToVectorStore()
    res.status(200).json({ success: true })
})

export default movieRouter
