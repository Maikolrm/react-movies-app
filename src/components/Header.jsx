import React, { useEffect, useContext, useEref, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

// CONTEXT
import AppState from "../AppState"
import AppDispatch from "../AppDispatch"

function Header(props) {

  // BUTTON REF
  const button = useRef()

  // NAVIGATE
  const navigate = useNavigate()

  // APP STATE
  const appState = useContext(AppState)

  // APP DISPATCH
  const appDispatch = useContext(AppDispatch)

  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault()
    if (props.query.trim() && !props.fetching) {
      navigate('/')
      appDispatch({ type: 'search-movies' })
    }
  }

  // HANDLE KEYPREESS
  function handleKeypres(e) {
    // keyCode === 27 means Escape key
    if (e.keyCode === 27) {
      appDispatch({ type: 'show-menu', value: false })
      button.current.blur()
    }
  }

  // TOGGLE KEYPRESS EVENT
  useEffect(() => {
    document.addEventListener('keyup', handleKeypres)
    return () => document.removeEventListener('keyup', handleKeypres)
  }, [])

  return (
    <div className="flex items-center justify-between bg-sky-900 px-4 py-2">
      <Link to="/" className="block text-teal-400 font-bold leading-none">MDB</Link>
      <div className="relative flex-1 mx-4 max-w-md bg-white rounded-full">
        <form onSubmit={handleSubmit} className="flex rounded-full overflow-hidden">
          <input value={props.query} onChange={e => appDispatch({ type: 'set-query', query: e.target.value })} type="text" className="flex-1 pl-5 text-xs text-gray-500 leading-10 tracking-widest outline-none" placeholder="Search...."/>
          <button tabIndex="-1" disbled={props.fetching ? 'disabled' : ''} className={"w-10 h-10 text-[14px] text-center leading-10 outline-none " + (props.fetching ? 'text-sky-500 animate-spin' : 'text-gray-400')}>
            <i className={"fas " +  (props.fetching ? 'fa-circle-notch' : 'fa-search')}></i>
          </button>
        </form>
        {/* MOVIES SUGGESTIONS */}
        <div className="hidden absolute z-10 mt-3 left-0 w-full h-60 p-1 bg-white rounded shadow-lg">
          <a href="#" className="mb-1 flex items-center p-1 bg-gray-100 rounded outline-none hover:bg-sky-200 focus:bg-sky-200">
            <div className="w-12 h-12 bg-white rounded overflow-hidden">
              <img className="w-full h-full object-cover"src="https://image.tmdb.org/t/p/w200/45YC86aMjWlcPkvgWwqdI6Clq7b.jpg" alt="Last Bold" />
            </div>
            <h2 className="flex-1 pl-4 text-xs text-gray-600 leading-none">Movie name</h2>
            <span className="w-8 h-8 bg-sky-200"></span>
          </a>
          <a href="#" className="flex items-center p-1 bg-gray-100 rounded outline-none hover:bg-sky-200 focus:bg-sky-200">
            <div className="w-12 h-12 bg-white rounded overflow-hidden">
              <img className="w-full h-full object-cover"src="https://image.tmdb.org/t/p/w200/pzPdwOitmTleVE3YPMfIQgLh84p.jpg" alt="Last Bold" />
            </div>
            <h2 className="flex-1 pl-4 text-xs text-gray-600 leading-none">Movie name</h2>
            <span className="w-8 h-8 bg-sky-200"></span>
          </a>
        </div>
        {/* MOVIES SUGGESTIONS */}
      </div>
      <div className="relative">
        <button ref={button} onClick={() => appDispatch({ type: 'show-menu', value: !appState.showMenu })} className="block w-10 h-10 border-2 border-gray-400 rounded-full focus:border-teal-600 outline-none overflow-hidden">
          <img src="https://www.gravatar.com/avatar/4c47390a9b7da357a0d6d051bbf66270?s=200" alt="Maikol Hernandez" />
        </button>
        {appState.showMenu && (
          <div className="absolute z-20 right-0 w-[300px] p-1 mt-3 bg-white rounded shadow-md">
            <Link onClick={() => appDispatch({ type: 'show-menu', value: false })} to="/favorites" className="block p-2 hover:bg-gray-100 text-xs text-gray-400 outline-none focus:bg-gray-100">Fovorite movies <span className="float-right">( {appState.favorites.length} )</span></Link>
            <Link onClick={() => appDispatch({ type: 'show-menu', value: false })} to="/watched" className="block p-2 mt-1 hover:bg-gray-100 text-xs text-gray-400 outline-none focus:bg-gray-100">Watched movies <span className="float-right">( {appState.watched.length} )</span></Link>
            <button className="block w-full py-2 mt-1 bg-sky-400 rounded-sm text-sm text-white outline-none hover:bg-sky-500 focus:bg-sky-500">Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header