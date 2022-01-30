import React, { useEffect } from "react"

// COMPONENTS
import Page from "./Page"
import Movies from "./Movies"

function MoviesCollection({ collection, movies }) {
  return (
    <Page title={`${collection} Movies`}>
      <Movies movies={movies} remove={true} />
    </Page>
  )
}

export default MoviesCollection