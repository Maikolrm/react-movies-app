import React from "react"

function Container(props) {
  return (
    <div className={`py-10 ${props.grid ? 'px-2 max-w-screen-2xl m-auto grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''}`}>
      {props.children}
    </div>
  )
}

export default Container