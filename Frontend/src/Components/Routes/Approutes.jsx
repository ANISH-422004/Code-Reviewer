import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../views/home/Home'
import Project from '../views/Project/Project'

const Approutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/project/:id' element={<Project/>} />
    </Routes>
  )
}

export default Approutes