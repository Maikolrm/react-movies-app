import React, { useEffect } from "react"
import { Link } from 'react-router-dom'

function Movie({ movie, remove }) {
  return (
    <div className="relative p-1 bg-white rounded-sm border overflow-hidden">
      {remove && <button className="absolute top-3 left-[50%] -ml-5 z-10 w-10 h-10 bg-gray-900/50 rounded text-sm text-center text-red-400 leading-10"><i className="fas fa-trash"></i></button>}
      <Link to={`/movie-overview/${movie.id}`} className="block max-h-[550px] bg-gray-200 rounded overflow-hidden sm:h-[70vw] md:h-[50vw]">
        {movie.poster_path ? <img  className="w-full h-full object-cover" src={"https://themoviedb.org/t/p/w300" + (movie.poster_path)} alt={movie.title} /> : ''}
      </Link>
      <div className="pt-3">
        <h2 className="text-md leading-none text-gray-600 font-bold truncate">{movie.title}</h2>
        <h4 className="mt-2 text-xs font-semibold leading-none text-gray-400">{movie.release_date ? movie.release_date : '-'}</h4>
      </div>
    </div>
  )
}

export default Movie