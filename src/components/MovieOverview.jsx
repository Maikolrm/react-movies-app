import React, { useState, useEffect } from "react"
import { useImmer } from 'use-immer'
import { useParams } from 'react-router-dom'

// AXIOS
import axios from 'axios'

// COPONENTS
import Page from "./Page"

function MovieOverview(props) {

  // MOVIE ID
  const { id } = useParams()

  // LOCAL STATE
  const [movie, setMovie] = useState({})
  const [cast, setCast] = useState([])
  const [director, setDirector] = useState({})
  const isFavorite = props.favorites.find(favorite => favorite.id === movie.id)
  
  // FETCH DATA
  useEffect(() => {
    async function fecthData() {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_APP_MDB_KEY}`
        const movie = await axios.get(url)
        const credits = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_APP_MDB_KEY}`)
        const directors = credits.data.crew.filter(crew => crew.job === 'Director')
        setMovie(movie.data)
        setCast(credits.data.cast.slice(0, 10))
        setDirector(directors[0])
      } catch(e) { console.log(e) }
    }
    fecthData()
  }, [])

  return (
    <Page title={`${movie.title ? movie.title + ' - Overview': '..'}`} >
      <div className="py-12">
        <div className="bg-gray-100 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(https://themoviedb.org/t/p/w1280${movie.backdrop_path})` } }>
          <div className="bg-black/60 p-[2vw] flex">
            <div className="w-[20vw] max-w-[400px] rounded-lg overflow-hidden shadow-lg">
              <img className="w-full h-full object-cover" src={`https://themoviedb.org/t/p/w400${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="flex flex-1 flex-col justify-center px-[2vw] pr-[20vw]">
              <h1 className="font-semibold text-[1.5vw] text-gray-100 leading-none">{movie.title}</h1>
              {/* ACTIONS */}
              <div className="flex items-center py-6">
                <button className="w-10 h-10 bg-sky-900 rounded-full text-white text-sm leading-10"><i className="fas fa-tasks"></i></button>
                <button className={"w-10 h-10 ml-3 bg-sky-900 rounded-full text-sm leading-10 " + (isFavorite ? 'text-sky-500' : 'text-white')}><i className="fas fa-heart"></i></button>
                {/* <button className="w-10 h-10 ml-3 bg-sky-900 rounded-full text-white text-sm leading-10"><i className="fas fa-star"></i></button> */}
                <button className="pl-5 font-bold text-white leading-none">view trailer</button>
              </div>
              {/* ACTIONS */}
              <h2 className="text-sm text-gray-300 italic tracking-wide">{movie.tagline}</h2>
              <div className="mt-4">
                <h3 className="font-bold text-xl text-white leading-none">Vista general</h3>
                <p className="mt-4 text-white leading-8 tracking-wide">{movie.overview}</p>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold text-md text-white leading-none">{director.name}</h3>
                <p className="mt-2 text-xs text-white tracking-wide">{director.job}</p>
              </div>
            </div>
          </div>
        </div>
        {/* CASTING */}
        <div className="mt-5 w-[90%] bg-gray-100 m-auto">
          <h2 className="text-lg font-semibold text-gray-500">Movie Cast</h2>
          <div className="flex overflow-auto py-2 mt-3">
            {cast.map(actor => (
              <div key={actor.id} className="min-w-[200px] mr-3 bg-white rounded overflow-hidden shadow">
                <div className="h-[250px] bg-gray-200 overflow-hidden">
                  <img src={`https://themoviedb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                </div>
                <div className="p-2">
                  <h3 className="text-md text-gray-800 font-bold leading-none tracking-wide truncate">{actor.name}</h3>
                  <p className="mt-2 text-xs text-gray-400 leading-none truncate">{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* CASTING */}
      </div>
    </Page>
  )
}

export default MovieOverview