import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Home, Detail } from './pages/index'
import './App.scss'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to="/pokemon" />}></Route>
        <Route path="/pokemon" element={<Home />}></Route>
        <Route path="/pokemon/:name" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
