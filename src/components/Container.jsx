import React, { useContext } from "react"

// CONTEXT
import AppState from "../AppState"
import AppDispatch from "../AppDispatch"

function Container(props) {
  
  // APP STATE
  const appState = useContext(AppState)

  // APP DISPATCH
  const appDispatch = useContext(AppDispatch)

  return (
    <div className={`py-10 m-auto ${props.grid ? 'px-2 max-w-screen-2xl' : ''} ${appState.blured ? 'opacity-5' : ''} transition duration-[100ms]`}>
      {Boolean(props.count) && <h2 className="pb-4 text-[10px] font-semibold text-gray-500 dark:text-gray-300 leading-none uppercase tracking-widest">{props.heading} <span>( {props.count} )</span></h2>}
      <div className={`${props.grid ? 'grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''}`}>
        {props.children}
        {appState.blured && <div onClick={() => appDispatch({ type: 'show-menu', value: false })} className="fixed inset-0 z-[100] w-full h-full"></div>}
      </div>
    </div>
  )
}

export default Container