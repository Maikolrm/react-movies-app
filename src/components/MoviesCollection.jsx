import React, { useEffect } from "react"

// COMPONENTS
import Page from "./Page"
import Movies from "./Movies"

function MoviesCollection({ movies, collection }) {
  return (
    <Page title={`${collection} Movies`} grid={true} >
      {Boolean(movies.length) ? <Movies movies={movies} remove={true} collection={collection} /> : <h1 className="mt-10 text-[16px] text-center text-gray-400 leading-none tracking-wide">Your <span className="font-semibold">{collection}</span> movies list is empty. Add some movies</h1>}
    </Page>
  )
}

export default MoviesCollection