import React, { useEffect, useContext } from "react"

// AXIOS
import axios from "axios"

// CONTEXT
import AppState from "../AppState"
import AppDispatch from "../AppDispatch"

// COMPONENTS
import Page from "./Page"
import Movies from "./Movies"

function Homepage(props) {

  // APP STATE
  const appState = useContext(AppState)
  
  // APP DISPATCH
  const appDispatch = useContext(AppDispatch)

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
    <Page title="Welcome" >
      <Movies movies={appState.movies} />
    </Page>
  )
}

export default Homepage