import React, { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
// AXIOS
import axios from "axios"

// CONTEXT
import AppDispatch from "../AppDispatch"

// COMPONENTS
import Page from "./Page"
import Movie from "./Movie"
import ContentHint from "./ContentHint"

// API
import { handleSearches } from "../api/api"

function Movies(props) {
  
  // LOCAL VARIABLES
  const searchResults = props.searches ? props.searches.results : null

  // URL PARAMS
  const params = useParams()

  // APP DISPATCH
  const appDispatch = useContext(AppDispatch)

  // FIRST MOUNT
  useEffect(() => appDispatch({ type: 'show-menu', value: false }), [])

  // WATCHING URL PARAMS CHANGES
  useEffect(() => {
    params.query ? appDispatch({ type: 'search-movies', query: params.query }) : null
  }, [params.query])

  // WATCH REQUEST COUNT CHANGES
  useEffect(() => {
    const request = axios.CancelToken.source()
    if (props.query) {
      async function fecthData() {
        try {
          const { data } = await axios.get(`/search/movie?api_key=${import.meta.env.VITE_APP_MDB_KEY}&query=${props.query}`)
          appDispatch({ type: 'set-movies', movies: data.results })
          searchResults && data.results.length ? appDispatch({ type: 'set-searches', searches: handleSearches(searchResults, props.query, 'new') }) : null
        } catch(e) { console.log(e) }
      }
      fecthData()
    }
    return () => request.cancel()
  }, [props.query])

  return (
    <Page title={props.query} grid={Boolean(props.movies.length)} count={props.movies.length} heading="movies">
      {Boolean(props.movies.length) ? props.movies.map(movie => <Movie key={movie.id} movie={movie} />) : <ContentHint content={<>No <span className="font-bold">results</span>. Try again.</>} />}
    </Page>
  )
}

export default Movies