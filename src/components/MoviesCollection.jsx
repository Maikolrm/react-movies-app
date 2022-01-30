import React, { useEffect } from "react"

// COMPONENTS
import Page from "./Page"
import Movies from "./Movies"

function MoviesCollection({ movies, collection }) {
  return (
    <Page title={`${collection} Movies`}>
      <Movies movies={movies} remove={true} collection={collection} />
    </Page>
  )
}

export default MoviesCollection