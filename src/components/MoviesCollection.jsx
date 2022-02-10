import React from "react"

// COMPONENTS
import Page from "./Page"
import Movie from "./Movie"
import ContentHint from "./ContentHint"

function MoviesCollection({ movies, collection }) {
  return (
    <Page title={`${collection} Movies`} grid={Boolean(movies.length)} count={movies.length} heading={collection}>
      {Boolean(movies.length) ? movies.map(movie=> <Movie key={movie.id} movie={movie} remove={true} collection={collection} />) : <ContentHint content={<>Your <span className="font-bold">{collection}</span> movies list is empty. Add some movies.</>} />}
    </Page>
  )
}

export default MoviesCollection