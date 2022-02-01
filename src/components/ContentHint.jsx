import React from "react"

function ContentHint(props) {
  return (
    <h1 className="text-[14px] text-center text-gray-400 leading-none tracking-wide">
      {props.content}
    </h1>
  )
}

export default ContentHint