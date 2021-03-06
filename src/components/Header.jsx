import React, { useState, useEffect, useContext, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

// CONTEXT
import AppState from "../AppState"
import AppDispatch from "../AppDispatch"

// API
import { handleSearches } from '../api/api'

function Header() {

  // LOCAL STATE
  const [query, setQuery] = useState('')

  // APP STATE
  const appState = useContext(AppState)

  // APP DISPATCH
  const appDispatch = useContext(AppDispatch)

  // LOCAL VARIABLES
  const fetching = appState.fetching
  const showMenu = appState.showMenu
  const theme = appState.theme
  const searches = appState.searches
  const showSearches = searches.show
  const searchResults = searches.results
  const favorites = appState.favorites
  const watched = appState.watched

  // FIELD REF
  const field = useRef()

  // BUTTON REF
  const button = useRef()

  // NAVIGATE
  const navigate = useNavigate()

  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim() && !fetching) {
      navigate('/search-movies/' + query)
      setQuery('')
      field.current.blur()
    }
  }

  // HANDLE KEYPREESS
  function handleKeypres(e) {
    // keyCode === 27 means Escape key
    if (e.keyCode === 27) {
      appDispatch({ type: 'show-menu', value: false })
      field.current.blur()
      button.current.blur()
    }
  }

  // HANDLE CLICK
  function handleClick(e) {
    const node = e.target.nodeName
    if (node != 'BUTTON') return appDispatch({ type: 'show-searches', value: false })
    e.preventDefault()
    appDispatch({ type: 'set-searches', searches: handleSearches(searchResults, e.target.getAttribute('data-query'), 'delete') })
  }

  // TOGGLE KEYPRESS EVENT
  useEffect(() => {
    document.addEventListener('keyup', handleKeypres)
    return () => document.removeEventListener('keyup', handleKeypres)
  }, [])

  return (
    <div className="relative flex items-center justify-between bg-sky-900 px-4 py-2">
      <Link to="/" className="block outline-none text-teal-400 font-bold leading-none">MDB</Link>
      <div className="relative z-[200] flex-1 mx-4 max-w-md bg-white rounded-full">
        <form onSubmit={handleSubmit} className="flex rounded-full overflow-hidden">
          <input ref={field} onFocus={() => appDispatch({ type: 'show-searches', value: Boolean(searchResults.length) })} value={query} onChange={e => setQuery(e.target.value)} type="text" className="flex-1 pl-5 text-xs text-gray-500 leading-10 tracking-widest outline-none" placeholder="Search...." />
          <button tabIndex="-1" disbled={fetching ? 'disabled' : ''} className={"w-10 h-10 text-[14px] text-center leading-10 outline-none " + (fetching ? 'text-sky-500' : 'text-gray-400')}>
            <i className={"fas " +  (fetching ? 'fa-circle-notch animate-spin' : 'fa-search')}></i>
          </button>
        </form>
        {/* MOVIES SUGGESTIONS */}
        <div className={`absolute mt-3 left-0 w-full p-1 bg-white rounded shadow-lg ${showSearches ? '' : 'hidden'}`}>
          {searchResults.map((query, i) => (
            <Link key={i} to={`/search-movies/${query}`} onClick={handleClick} className={`flex items-center ${i ? 'mt-1' : ''} bg-gray-100 outline-none rounded-sm text-gray-500 hover:bg-sky-500 hover:text-white focus:bg-sky-500 focus:text-white`}>
              <span className="inline-block w-8 h-10 text-xs text-center leading-10"><i className="fas fa-clock"></i></span>
              <h2 className="flex-1 font-bold uppercase text-[11px] leading-none tracking-widest">{query}</h2>
              <button data-query={query} tabIndex="-1" className="inline-block w-8 h-10 text-sm text-center text-white fas fa-times leading-10"></button>
            </Link>
          ))}
        </div>
        {/* MOVIES SUGGESTIONS */}
      </div>
      <div className="relative z-[200]">
        <button ref={button} onClick={() => appDispatch({ type: 'show-menu', value: !showMenu })} className="block w-10 h-10 border-2 border-gray-400 rounded-full focus:border-teal-600 outline-none overflow-hidden">
          <img src="https://www.gravatar.com/avatar/4c47390a9b7da357a0d6d051bbf66270?s=200" alt="Maikol Hernandez" />
        </button>
        {showMenu && (
          <div className="absolute right-0 w-[300px] p-1 mt-3 bg-white rounded shadow-md">
            <button onClick={() => appDispatch({ type: 'toggle-theme', theme: theme })} className="block w-full p-2 bg-gray-200 rounded text-xs text-left text-gray-400 outline-none">
              {theme == 'light' ? 'Dark Mode' : 'Light Mode' }
              <span className="inline-block float-right">
                <i className={`fas ${theme == 'dark' ? 'text-orange-400 fa-sun' : 'text-sky-500 fa-moon'}`}></i>
              </span>
            </button>
            <Link onClick={() => appDispatch({ type: 'show-menu', value: false })} to="/favorites" className="block p-2 mt-1 hover:bg-gray-100 text-xs text-gray-400 outline-none focus:bg-gray-100">Fovorite movies <span className="float-right inline-block pr-1">{favorites.length}</span></Link>
            <Link onClick={() => appDispatch({ type: 'show-menu', value: false })} to="/watched" className="block p-2 mt-1 hover:bg-gray-100 text-xs text-gray-400 outline-none focus:bg-gray-100">Watched movies <span className="float-right inline-block pr-1">{watched.length}</span></Link>
            <button className="block w-full py-2 mt-1 bg-sky-400 rounded-sm text-sm text-white outline-none hover:bg-sky-500 focus:bg-sky-500">Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header