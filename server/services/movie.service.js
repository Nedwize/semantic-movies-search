import Movie from '../models/movie.model.js'

class MovieService {
    static async FindMovieByKeyword(searchString) {
        try {
            const searchRegex = new RegExp(searchString, 'i') // 'i' makes the search case-insensitive
            const match = {
                $or: [
                    { title: { $regex: searchRegex } },
                    { plot: { $regex: searchRegex } },
                ],
            }
            const results = await Movie.find(match).select(
                'id title plot poster'
            )

            return results
        } catch (error) {
            console.error('Error searching for string:', error)
            throw error
        }
    }
}

export default MovieService
