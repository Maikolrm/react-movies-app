import React, { useEffect } from "react"

// COMPONENTS
import Container from "./Container"

function Page(props) {
  
  // FORMAT TITLE
  function formatTitle(title) {
    return title
      .trim()
      .split(' ')
      .map(word => word.slice(0, 1).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // WATCHING FOR TITLE CHANGES
  useEffect(() => {
    document.title = props.title ? `${formatTitle(props.title)} - Movies App` : '...'
    window.scrollTo(0, 0)
  }, [props.title])

  return (
    <Container grid={props.grid} count={props.count} heading={props.heading}>
      {props.children}
    </Container>
  )
}

export default Page