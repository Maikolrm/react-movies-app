import React, { useContext } from "react"

// CONTEXT
import AppState from '../AppState'

// COMPONENTS
import Page from "./Page"
import Movie from "./Movie"
import ContentHint from "./ContentHint"

function MoviesCollection({ collection }) {

  // APP STATE
  const appState = useContext(AppState)

  // LOCAL VARIABLES
  const movies = collection == 'favorites' ? appState.favorites : appState.watched
  
  return (
    <Page title={`${collection} Movies`} grid={Boolean(movies.length)} count={movies.length} heading={collection}>
      {Boolean(movies.length) ? movies.map(movie=> <Movie key={movie.id} movie={movie} remove={true} collection={collection} />) : <ContentHint content={<>Your <span className="font-bold">{collection}</span> movies list is empty. Add some movies.</>} />}
    </Page>
  )
}

export default MoviesCollection