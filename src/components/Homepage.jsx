import React, { useEffect, useContext } from "react"

// AXIOS
import axios from "axios"

// CONTEXT
import AppDispatch from "../AppDispatch"

// COMPONENTS
import Page from "./Page"
import Movie from "./Movie"
import ContentHint from "./ContentHint"

function Homepage(props) {
  
  // APP DISPATCH
  const appDispatch = useContext(AppDispatch)

  // FIRST MOUNT
  useEffect(() => appDispatch({ type: 'show-menu', value: false }), [])

  // WATCH REQUEST COUNT CHANGES
  useEffect(() => {
    const request = axios.CancelToken.source()
    if (!props.requestCount || props.requestCount && props.query) {
      async function fecthData() {
        try {
          const { data } = await axios.get(`/search/movie?api_key=${import.meta.env.VITE_APP_MDB_KEY}&query=${props.query}`)
          appDispatch({ type: 'set-movies', movies: data.results })
        } catch(e) { console.log(e) }
      }
      fecthData()
    }
    return () => request.cancel()
  }, [props.requestCount])

  return (
    <Page title="Welcome" grid={Boolean(props.movies.length)}>
      {Boolean(props.movies.length) ? props.movies.map(movie => <Movie key={movie.id} movie={movie} />) : props.requestCount ? <ContentHint content={<>No <span className="font-bold">results</span>. Try again.</>} /> : ''}
    </Page>
  )
}

export default Homepage