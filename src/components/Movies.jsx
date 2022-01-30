import React, { useEffect } from "react"

// COMPONENTS
import Movie from './Movie'

function Movies({ movies }) {
  return (
    <div className="px-2 py-10 max-w-screen-2xl m-auto grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
    </div>
  )
}

export default Movies