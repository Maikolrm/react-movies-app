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
import Movies from './components/Movies'
import MovieOverview from './components/MovieOverview'
import MoviesCollection from './components/MoviesCollection'

function App() {

  // INITIAL STATE
  const initialState = {
    fetching: false,
    query: '',
    movies: [],
    favorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [],
    watched: localStorage.getItem('watched') ? JSON.parse(localStorage.getItem('watched')) : [],
    showMenu: false,
    showTrailer: false,
    theme: localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : 'light',
    blured: false,
    searches: {
      show: false,
      results: localStorage.getItem('searches') ? JSON.parse(localStorage.getItem('searches')) : []
    },
    requestCount: 0
  }

  // REDUCER
  function reducer(draft, action) {
    switch(action.type) {
      case 'toggle-theme':
        draft.theme = action.theme == 'light' ? 'dark' : 'light'
        break
      case 'show-menu':
        draft.showMenu = action.value
        draft.searches.show = false
        draft.blured = action.value
        break
      case 'show-trailer':
        draft.showTrailer = action.value
        break
      case 'show-searches':
        draft.blured = action.value
        draft.searches.show = action.value
        draft.showMenu = false
        break
      case 'search-movies':
        draft.query = action.query
        draft.fetching = true
        break
      case 'set-movies':
        draft.movies = action.movies
        draft.fetching = false
        draft.blured = false
        draft.searches.show = false
        break
      case 'set-searches':
        draft.searches.results = action.searches
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

  // TOGGLE DARK MODE
  useEffect(() => {
    const root = document.documentElement
    state.theme == 'dark' ? root.classList.add('dark') : root.classList.remove('dark')
    localStorage.setItem('theme', JSON.stringify(state.theme))
  }, [state.theme])

  // WATCHING SEARCHES
  useEffect(() => {
    localStorage.setItem('searches', JSON.stringify(state.searches.results))
  }, [state.searches.results])

  return (
    <AppState.Provider value={state}>
    <AppDispatch.Provider value={dispatch}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Movies page="welcome" />} />
          <Route path="/search-movies/:query" element={<Movies page="searches" />} />
          <Route path="/movie-overview/:id" element={<MovieOverview />} />
          <Route path="/favorites" element={<MoviesCollection collection="favorites" />} />
          <Route path="/watched" element={<MoviesCollection collection="watched" />} />
        </Routes>
      </BrowserRouter>
    </AppDispatch.Provider>
    </AppState.Provider>
  )
}

export default App
