import mongoose, { Schema } from 'mongoose'

const movieSchema = new Schema(
    {
        title: { type: String, required: true },
        plot: { type: String },
        genres: { type: [String] },
        runtime: { type: Number },
        cast: { type: [String] },
        poster: { type: String },
        fullplot: { type: String },
        languages: { type: [String] },
        released: { type: Date },
        directors: { type: [String] },
        rated: { type: String },
        awards: {
            wins: { type: Number },
            nominations: { type: Number },
            text: { type: String },
        },
        year: { type: Number },
        imdb: {
            rating: { type: Number },
            votes: { type: Number },
            id: { type: Number },
        },
        countries: { type: [String] },
        type: { type: String },
    },
    { collection: 'movies' }
)

const Movie = mongoose.model('Movie', movieSchema)

movieSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

export default Movie
