import { Router } from 'express'
import MovieService from '../services/movie.service.js'

const movieRouter = Router()

movieRouter.get('/search', async (req, res) => {
    const q = req.query.q?.toString() || ''
    if (!q) return res.status(200).json({ success: true, movies: [] })

    const films = await MovieService.FindMovieByKeyword(q)
    res.status(200).json({ success: true, movies: films })
})

export default movieRouter
