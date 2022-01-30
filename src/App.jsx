import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'

// AXIOS
import axios from 'axios'
axios.defaults.baseURL = `https://api.themoviedb.org/3`

// CONTEXT
import AppState from './AppState'
import AppDispatch from './AppDispatch'

// COMPONENTS
import Header from './components/Header'
import Homepage from './components/Homepage'
import MovieOverview from './components/MovieOverview'

function App() {

  // INITIAL STATE
  const initialState = {
    fetching: false,
    query: 'wick',
    movies: [],
    favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [],
    watched: localStorage.getItem('watched') ? JSON.parse(localStorage.getItem('watched')) : [],
    requestCount: 1
  }

  // REDUCER
  function reducer(draft, action) {
    switch(action.type) {
      case 'set-query':
        draft.query = action.query
        break
      case 'search-movies':
        draft.fetching = true
        draft.requestCount++
        break
      case 'set-movies':
        draft.movies = action.movies
        draft.query = ''
        draft.fetching = false
        break
      case `toggle-collections`:
        // COLLECTION MAKES REFERENCES TO FAVORITES OR WATCHED MOVIES
        if (action.isInCollection) {
          draft[action.collection] = draft[action.collection].filter(movie => movie.id != action.movie.id)
        } else {
          draft[action.collection].push(action.movie)
        }
        break
    }
  }
  
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  // WATCHING FAVORITES MOVIES
  useEffect(() => {
    if (state.favorites.length) {
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    } else {
      localStorage.removeItem('favorites')
    }
  }, [state.favorites])

  // WATCHING WATCHED MOVIES
  useEffect(() => {
    if (state.watched.length) {
      localStorage.setItem('watched', JSON.stringify(state.watched))
    } else {
      localStorage.removeItem('watched')
    }
  }, [state.watched])

  return (
    <AppState.Provider value={state}>
    <AppDispatch.Provider value={dispatch}>
      <BrowserRouter>
        <Header query={state.query} fetching={state.fetching} />
        <Routes>
          <Route path="/" element={<Homepage query={state.query} requestCount={state.requestCount} />} />
          <Route path="/movie-overview/:id" element={<MovieOverview favorites={state.favorites} watched={state.watched} />} />
        </Routes>
      </BrowserRouter>
    </AppDispatch.Provider>
    </AppState.Provider>
  )
}

export default App
