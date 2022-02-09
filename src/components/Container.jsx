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
    <div className={`py-10 ${appState.blured ? 'opacity-5' : ''} ${props.grid ? 'px-2 max-w-screen-2xl m-auto grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''} transition duration-[50ms]`}>
      {props.children}
      {appState.blured && <div onClick={() => appDispatch({ type: 'show-menu', value: false })} className="fixed inset-0 z-10 w-full h-full"></div>}
    </div>
  )
}

export default Container