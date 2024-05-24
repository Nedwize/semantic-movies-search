import React from 'react'

function App() {
    const [searchTerm, setSearchTerm] = React.useState('')
    const [movies, setMovies] = React.useState([])
    const [isCoolSearchOn, setIsCoolSearchOn] = React.useState(false)

    const fetchMovies = async () => {
        if (!searchTerm) return
        if (!isCoolSearchOn) {
            const response = await fetch(`/api/movies/search?q=${searchTerm}`)
            const data = await response.json()
            if (data?.movies?.length) {
                setMovies(data.movies)
            }
        } else {
            const response = await fetch(
                `/api/movies/cool-search=${searchTerm}`
            )
            const data = await response.json()
            if (data?.movies?.length) {
                setMovies(data.movies)
            }
        }
    }

    const handleSearch = () => {
        if (!searchTerm) return
        setIsCoolSearchOn(false) // TODO: remove this
        fetchMovies()
    }

    return (
        <div className="mx-auto w-[800px] h-screen p-4">
            <div class="flex items-center"></div>
            <div className="flex gap-4 mt-10 mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-grow px-6 p-2 border rounded-3xl border-gray-300 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={() => handleSearch()}
                    className="px-6 p-2 bg-gradient-to-r rounded-3xl from-blue-500 to-blue-700 text-white font-semibold"
                >
                    Search
                </button>
            </div>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    )
}

const MovieCard = ({ movie }) => {
    const [errored, setErrored] = React.useState(false)
    return (
        <div
            key={movie.id}
            className="w-[150px] border border-gray-300 p-2 rounded-md shadow-md"
        >
            <img
                src={
                    errored || !movie.poster
                        ? 'https://via.placeholder.com/150x210'
                        : movie.poster
                }
                alt={movie.title}
                className="w-full h-auto rounded-md"
                onError={() => setErrored(true)}
            />
            <h3 className="mt-2 font-semibold text-center">{movie.title}</h3>
        </div>
    )
}

export default App
