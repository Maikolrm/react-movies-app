import React, { useEffect } from "react"

// COMPONENTS
import Container from "./Container"

function Page(props) {
  
  useEffect(() => {
    document.title = `${props.title} | Movies App`
    window.scrollTo(0, 0)
  }, [props.title])

  return (
    <Container grid={props.grid}>
      {props.children}
    </Container>
  )
}

export default Page