import React from 'react'
import NavBar from '../components/NavBar'

const Home: React.FC = () => {

  document.title = 'Home ― To-Do List | Snarloff (Adonis.js 5)'

  return (
    <div>
      <NavBar />
      <p>Home</p>
    </div>
  )
}

export default Home