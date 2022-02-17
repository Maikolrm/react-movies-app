import React, { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
// AXIOS
import axios from "axios"

// CONTEXT
import AppState from "../AppState"
import AppDispatch from "../AppDispatch"

// COMPONENTS
import Page from "./Page"
import Movie from "./Movie"
import ContentHint from "./ContentHint"

// API
import { handleSearches } from "../api/api"

function Movies({ page }) {
  
  // APP STATE
  const appState = useContext(AppState)

  // APP DISPATCH
  const appDispatch = useContext(AppDispatch)

  // LOCAL VARIABLES
  const movies = appState.movies
  const query = page == 'welcome' ? 'john wick' : appState.query
  const searchResults = page == 'welcome' ? undefined : appState.searches.results

  // URL PARAMS
  const params = useParams()

  // FIRST MOUNT
  useEffect(() => appDispatch({ type: 'show-menu', value: false }), [])

  // WATCHING URL PARAMS CHANGES
  useEffect(() => {
    params.query ? appDispatch({ type: 'search-movies', query: params.query }) : null
  }, [params.query])

  // WATCH REQUEST COUNT CHANGES
  useEffect(() => {
    const request = axios.CancelToken.source()
    if (query) {
      async function fecthData() {
        try {
          const { data } = await axios.get(`/search/movie?api_key=${import.meta.env.VITE_APP_MDB_KEY}&query=${query}`)
          appDispatch({ type: 'set-movies', movies: data.results })
          searchResults && data.results.length ? appDispatch({ type: 'set-searches', searches: handleSearches(searchResults, query, 'new') }) : null
        } catch(e) { console.log(e) }
      }
      fecthData()
    }
    return () => request.cancel()
  }, [query])

  return (
    <Page title={query} grid={Boolean(movies.length)} count={movies.length} heading="movies">
      {Boolean(movies.length) ? movies.map(movie => <Movie key={movie.id} movie={movie} />) : <ContentHint content={<>No <span className="font-bold">results</span>. Try again.</>} />}
    </Page>
  )
}

export default Movies