import React, { useEffect, useContext } from "react"

// AXIOS
import axios from "axios"

// CONTEXT
import AppDispatch from "../AppDispatch"

// COMPONENTS
import Page from "./Page"
import Movie from "./Movie"

function Homepage(props) {
  
  // APP DISPATCH
  const appDispatch = useContext(AppDispatch)

  // FIRST MOUNT
  useEffect(() => appDispatch({ type: 'show-menu', value: false }), [])

  // WATCH REQUEST COUNT CHANGES
  useEffect(() => {
    const request = axios.CancelToken.source()
    if (props.requestCount && props.query) {
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
    <Page title="Welcome" grid={true}>
      {props.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
    </Page>
  )
}

export default Homepage