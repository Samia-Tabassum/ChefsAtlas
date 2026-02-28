import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UserDashboard from './components/UserDashboard'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div style={{ paddingTop: '72px', minHeight: '100vh', background: '#fdf6ec' }} />} />
        <Route path="/profile" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App