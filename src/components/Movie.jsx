import React, { useContext } from "react"
import { Link } from 'react-router-dom'

// CONTEXT
import AppDispatch from "../AppDispatch"

function Movie({ movie, remove, collection }) {

  // APP DISPATCH
  const appDispatch = useContext(AppDispatch)

  // HANDLE REMOVE
  function handleRemove(id) {
    appDispatch({ type: 'toggle-collections', isInCollection: true, collection: collection, movie: { id: id } })
  }

  return (
    <div className="relative p-1 bg-white rounded-sm overflow-hidden dark:bg-gray-700">
      {remove && <button onClick={() => handleRemove(movie.id)} className="absolute top-3 left-[50%] -ml-5 z-10 w-10 h-10 bg-gray-900/50 rounded text-sm text-center text-red-400 leading-10 outline-none"><i className="fas fa-trash"></i></button>}
      <Link to={`/movie-overview/${movie.id}`} className="block max-h-[550px] bg-gray-200 rounded overflow-hidden sm:h-[70vw] md:h-[50vw] outline-none dark:bg-gray-800">
        {movie.poster_path ? <img  className="w-full h-full object-cover" src={"https://themoviedb.org/t/p/w300" + (movie.poster_path)} alt={movie.title} /> : ''}
      </Link>
      <div className="pt-3">
        <h2 className="text-md leading-none text-gray-600 font-bold truncate dark:text-gray-300">{movie.title}</h2>
        <h4 className="mt-2 text-xs font-semibold leading-none text-gray-400 dark:text-gray-400">{movie.release_date ? movie.release_date : '-'}</h4>
      </div>
    </div>
  )
}

export default Movie