import React, { useEffect, useContext } from "react"
import { useImmer } from 'use-immer'
import { useParams } from 'react-router-dom'

// AXIOS
import axios from 'axios'

// CONTEXT
import AppState from "../AppState"
import AppDispatch from "../AppDispatch"

// COPONENTS
import Page from "./Page"
import MovieCast from "./MovieCast"
import MovieTrailer from "./MovieTrailer"

function MovieOverview(props) {

  // MOVIE ID
  const { id } = useParams()

  // APP STATE
  const appState = useContext(AppState)

  // APP DISPACTH
  const appDispatch = useContext(AppDispatch)

  // LOCAL STATE
  const [state, setState] = useImmer({ movie: {}, cast: [], director: {} })
  const isFavorite = props.favorites.find(favorite => favorite.id === state.movie.id)
  const isWatched = props.watched.find(watched => watched.id === state.movie.id)
  
  // HANDLE ACTION
  function handleAction(collection) {
    const movie = {
      id: state.movie.id,
      title: state.movie.title,
      release_date: state.movie.release_date,
      poster_path: state.movie.poster_path
    }
    appDispatch({ type: `toggle-collections`, collection: collection, isInCollection: collection == 'favorites' ?  isFavorite : isWatched, movie: movie })
  }

  // FETCH DATA
  useEffect(() => {
    const request = axios.CancelToken.source()
    async function fecthData() {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_APP_MDB_KEY}`
        const movie = await axios.get(url)
        const credits = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_APP_MDB_KEY}`)
        const directors = credits.data.crew.filter(crew => crew.job === 'Director')
        setState(draft => {
          draft.movie = movie.data
          draft.cast = credits.data.cast.slice(0, 10)
          draft.director = directors[0]
        })
      } catch(e) { console.log(e) }
    }
    fecthData()
    return () => request.cancel()
  }, [])

  return (
    <Page title={`${state.movie.title ? state.movie.title + ' - Overview': '...'}`} >
      {appState.showTrailer && <MovieTrailer movie={{ id: state.movie.id }} dispatch={appDispatch} />}
      <div className="bg-gray-100 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(https://themoviedb.org/t/p/w1280${state.movie.backdrop_path})` } }>
        <div className="bg-black/60 p-[2vw] flex">
          <div className="hidden w-[20vw] max-w-[400px] rounded-lg overflow-hidden shadow-lg xl:block">
            <img className="w-full h-full object-cover" src={`https://themoviedb.org/t/p/w400${state.movie.poster_path}`} alt={state.movie.title} />
          </div>
          <div className="flex flex-1 flex-col justify-center p-[2vw] xl:pr-[20vw]">
            <h1 className="font-semibold text-gray-100 text-[5.5vw] sm:text-[2.3rem] leading-none">{state.movie.title}</h1>
            {/* ACTIONS */}
            <div className="flex items-center py-6">
              <button onClick={() => handleAction('watched')} className={"w-10 h-10 bg-sky-900 rounded-full text-sm leading-10 " + (isWatched ? 'text-sky-500' : 'text-white')}><i className="fas fa-tasks"></i></button>
              <button onClick={() => handleAction('favorites')} className={"w-10 h-10 ml-3 bg-sky-900 rounded-full text-sm leading-10 " + (isFavorite ? 'text-sky-500' : 'text-white')}><i className="fas fa-heart"></i></button>
              {/* <button className="w-10 h-10 ml-3 bg-sky-900 rounded-full text-white text-sm leading-10"><i className="fas fa-star"></i></button> */}
              <button onClick={() => appDispatch({ type: 'show-trailer', value: true })} className="ml-5 font-bold text-white leading-none outline-none">view trailer</button>
            </div>
            {/* ACTIONS */}
            <h2 className="text-sm text-gray-300 italic tracking-wide">{state.movie.tagline}</h2>
            <div className="mt-4">
              <h3 className="font-bold text-xl text-white leading-none">Vista general</h3>
              <p className="mt-4 text-white leading-8 tracking-wide">{state.movie.overview}</p>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-md text-white leading-none">{state.director.name}</h3>
              <p className="mt-2 text-xs text-white tracking-wide">{state.director.job}</p>
            </div>
          </div>
        </div>
      </div>
      {Boolean(state.cast.length) && <MovieCast cast={state.cast} />}
    </Page>
  )
}

export default MovieOverview