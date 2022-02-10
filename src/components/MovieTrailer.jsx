import React, { useState, useEffect } from "react"

// AXIOS
import axios from "axios"

function MovieTrailer({ movie, dispatch }) {

  // LOCAL STATE
  const [trailer, setTrailer] = useState('')

  /// HANDLE KEYPRESS
  function handleKeyPress(e) {
    if (e.keyCode === 27) dispatch({ type: 'show-trailer', value: false })
  }

  // FRIST MOUNT
  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress)
    return () => document.removeEventListener('keypress', handleKeyPress)
  }, [])

  // FETCH VIDEOS
  useEffect(() => {
    const request = axios.CancelToken.source()
    async function fetchData() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_APP_MDB_KEY}`)
      const videos = data.results.map(video => video.key) // RETURN STRINGS ARRAY
      const index = Math.floor((Math.random() * videos.length) + 1)
      setTrailer(videos[index - 1])
    }
    fetchData()
    return () => request.cancel()
  }, [movie.id])

  return (
    <div onClick={() => dispatch({ type: 'show-trailer', value: false })} className="fixed z-[1000] inset-0 w-full h-full bg-black/70 flex">
      <div className="relative w-[90vw] max-w-[1280px] h-[60vw] max-h-[750px] m-auto rounded-md overflow-hidden">
        <iframe className="absolute inset-0 w-full h-full p-0 border-none" src={`https://www.youtube.com/embed/${trailer}`} allow="fullscreen" frameBorder={0}></iframe>
      </div>
    </div>
  )
}

export default MovieTrailer