import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UserDashboard from './components/UserDashboard'
import About from './components/About'
import Recipes from './pages/Recipes'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginSuccess={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
      />
      <Routes>
        <Route path="/" element={<div style={{ paddingTop: '72px', minHeight: '100vh', background: '#fdf6ec' }} />} />
        <Route path="/profile" element={isLoggedIn ? <UserDashboard /> : <div style={{ paddingTop: '72px', minHeight: '100vh', background: '#fdf6ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', color: '#4a2c17' }}>Please log in to view your profile.</div>} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App