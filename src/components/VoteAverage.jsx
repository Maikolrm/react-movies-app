import React from "react"

function VoteAveage(props) {
  return (
    <div className={`p-[2.5px] w-10 h-10 ${props.absolute ? `bg-gray-300 dark:bg-gray-800 ${props.position}` : 'bg-gray-800'} rounded-full`} style={{ backgroundImage: `conic-gradient(steelblue ${props.movie.vote_average * 10}%, transparent 0%)` }}>
      <div className={`flex h-full ${props.absolute ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gray-900'} rounded-full`}>
        <h4 className="m-auto text-xs text-gray-400 font-bold">{props.movie.vote_average}</h4>
      </div>
    </div>
  )
}

export default VoteAveage