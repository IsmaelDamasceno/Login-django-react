import { useState } from 'react'
import axios from 'axios'
import { RouterProvider } from 'react-router-dom'

function App(props) {

  return (
    <>
      <RouterProvider router={props.router} />
    </>
  )
}

export default App
