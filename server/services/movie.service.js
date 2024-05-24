import Movie from '../models/movie.model.js'
import Chroma from '../utils/chroma.js'

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

    static async FindMovieBySemantics(searchString) {
        const results = await Chroma.query({ q: searchString, n: 10 })
        if (
            results?.ids?.length &&
            results?.ids[0].length &&
            results?.distances?.length
        ) {
            return results
        }
        return []
    }

    static async FeedToVectorStore() {
        const BATCH_SIZE = 100
        let skip = 0
        let hasMore = true

        try {
            while (hasMore) {
                const movies = await Movie.find({
                    'imdb.votes': { $exists: true, $gte: 10000 },
                })
                    .skip(skip)
                    .limit(BATCH_SIZE)
                    .select('title plot fullplot')

                if (movies.length === 0) {
                    hasMore = false
                    break
                }

                const data = movies.map((movie) => {
                    const text = `${movie.title || ''}. Plot - ${movie.plot} ${
                        movie.fullplot
                    }.`
                    const id = movie._id.toString()
                    return { text, id }
                })
                await Chroma.bulkUpsert(data)
                console.log('Done - ', skip + BATCH_SIZE)
                skip += BATCH_SIZE
            }
        } catch (error) {
            console.error('Error feeding to vector store:', error)
            throw error
        }
    }
}

export default MovieService
