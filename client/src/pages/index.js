import React from 'react'
import BlackOverlay from '@/components/Overlay'
import NavBar from '@/components/Navbar'
import MazeApp from './MazeApp'

function Home() {
  return (
    <>
      <BlackOverlay />
      <NavBar />
      <MazeApp />
    </>
  )
}

export default Home