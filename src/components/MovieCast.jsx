import React, { useEffect } from "react"

function MovieCasting({ cast }) {
  return (
    <div className="mt-5 w-[90%] m-auto">
      <h2 className="text-lg font-semibold text-gray-500">Movie Cast</h2>
      <div className="flex overflow-auto py-2 mt-3">
        {cast.map(actor => (
          <div key={actor.id} className="min-w-[200px] mr-3 bg-white rounded overflow-hidden shadow dark:bg-gray-700">
            <div className="h-[250px] bg-gray-200 overflow-hidden dark:bg-gray-800">
              <img className="w-full object-cover" src={`https://themoviedb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
            </div>
            <div className="p-2">
              <h3 className="text-md text-gray-800 font-bold leading-none tracking-wide truncate dark:text-gray-900">{actor.name}</h3>
              <p className="mt-2 text-xs text-gray-400 leading-none truncate">{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieCasting