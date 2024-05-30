import React from 'react'
import SearchIcon from './components/icons/Search.js'
import EVENTS from './utils/analyticsConstants.js'
import { usePostHog } from 'posthog-js/react'

const SUGGESTIONS = {
    BORING: [
        'The Godfather',
        'Finding Nemo',
        'Godzilla',
        'Planet of the Apes',
        'Chakde',
        'Spider-man',
        'Interstellar',
    ],
    COOL: [
        "youngest son of an italian mafia takes over the family business on his father's demise",
        'a clownfish searches for his lost son',
        'lizard monster terrorises a city',
        'monkeys become smart and take over the world',
        "retired ex hockey player coaches indian women's hockey team",
        'man gets bitten by a spider and gets powers',
        'group of astronauts look for other habitable planets',
    ],
}

// Examples to use
// Fighter jets
// Horror movies with a haunted house
// Horror movies with a haunted doll
// kid gets left behind at home on christmas when entire family goes to paris
// a team attempts to blast an asteroid into pieces
// drummer

function App() {
    const [loading, setLoading] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')
    const [movies, setMovies] = React.useState([])
    const [isCoolSearchOn, setIsCoolSearchOn] = React.useState(false)

    const ph = usePostHog()

    const fetchMovies = async (q) => {
        try {
            const term = q || searchTerm
            if (!term) return
            setLoading(true)
            if (!isCoolSearchOn) {
                ph?.capture(EVENTS.COOL_SEARCH, { search: term })
                const response = await fetch(`/api/movies/search?q=${term}`)
                const data = await response.json()
                if (data?.movies && Array.isArray(data.movies)) {
                    setMovies(data.movies)
                }
            } else {
                ph?.capture(EVENTS.SEARCH, { search: term })
                const response = await fetch(
                    `/api/movies/cool-search?q=${term}`
                )
                const data = await response.json()
                if (data?.movies && Array.isArray(data.movies)) {
                    setMovies(data.movies)
                }
            }
        } catch (e) {
            //
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = () => {
        if (!searchTerm) return
        fetchMovies()
    }

    const currentSuggestions = isCoolSearchOn
        ? SUGGESTIONS.COOL
        : SUGGESTIONS.BORING

    return (
        <div className="mx-auto max-w-[800px] h-screen p-4">
            <div className="flex gap-2 justify-center">
                <p className="text-base font-semibold">Boring Search</p>
                <div className="space-x-3">
                    <label
                        htmlFor="select1"
                        className="relative inline-flex cursor-pointer items-center"
                    >
                        <input
                            type="checkbox"
                            id="select1"
                            className="peer sr-only"
                            onChange={(e) =>
                                setIsCoolSearchOn(e.target.checked)
                            }
                        />
                        <div
                            className={`h-6 w-11 rounded-full ${
                                isCoolSearchOn ? 'bg-blue-500' : 'bg-gray-400'
                            } after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-primary-200 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50`}
                        ></div>
                    </label>
                </div>
                <p className="text-base font-semibold">Cool Search</p>
            </div>
            <div className="w-full justify-center flex gap-2 mt-4 flex-wrap">
                {currentSuggestions.map((suggestion) => (
                    <button
                        key={suggestion}
                        className="px-2 py-1 border border-gray-200 rounded-3xl cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                            setSearchTerm(suggestion)
                            fetchMovies(suggestion)
                        }}
                    >
                        <p className="text-xs">{suggestion}</p>
                    </button>
                ))}
            </div>
            <form
                className="flex gap-4 mt-4 mb-4"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                }}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-grow px-6 p-2 border rounded-3xl border-gray-300 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={() => handleSearch()}
                    className="sm:px-6 px-4 p-2 bg-gradient-to-r rounded-3xl from-blue-500 to-blue-700 text-white font-semibold"
                >
                    <span className="sm:block hidden">Search</span>
                    <span className="sm:hidden block">
                        <SearchIcon size={20} />
                    </span>
                </button>
            </form>
            <div className="mt-10 pb-10 flex flex-wrap gap-4 justify-center text-center">
                {loading
                    ? [1, 2, 3, 4].map((x) => (
                          <MovieSkeletonCard key={`skel-${x}`} />
                      ))
                    : null}
                {!loading && movies.length ? (
                    movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))
                ) : (
                    <div>
                        <span>No movies found.</span>
                        <br />
                        <span className="text-xs leading-3">
                            Please note that the movie database not complete and
                            quite old. Movies released post 2017 will not be
                            available.
                        </span>
                    </div>
                )}
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

const MovieSkeletonCard = () => {
    return (
        <div
            className="w-[150px] border border-gray-300 p-2 pb-4 rounded-md shadow-md animate-pulse"
            style={{ aspectRatio: '150 / 210' }}
        >
            <div className="w-full h-full bg-gray-200 rounded-md" />
            <div className="w-3/4 h-2 bg-gray-300 rounded-md mt-2" />
        </div>
    )
}

export default App
