import './App.css'
<<<<<<< HEAD
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
=======
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
>>>>>>> 875f215d9328d267e32071fcdd5c1dcb2fc67500
import Navbar from './components/Navbar'
import UserDashboard from './components/UserDashboard'
import About from './components/About'
import Recipes from './pages/Recipes'
<<<<<<< HEAD
import AuthPage from './pages/AuthPage'
import { useAuth } from './context/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useAuth()

  if (authLoading) {
    return <div style={{ paddingTop: '120px', textAlign: 'center', color: '#8a7060' }}>Checking session...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
=======
import Signup from './components/Signup'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import CreateRecipe from "./pages/CreateRecipe";
>>>>>>> 875f215d9328d267e32071fcdd5c1dcb2fc67500

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showForgot, setShowForgot] = useState(false)

  return (
    <BrowserRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginSuccess={() => setIsLoggedIn(true)}
        onLogout={() => setIsLoggedIn(false)}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        onSwitchToSignup={() => { setShowLogin(false); setShowSignup(true) }}
        onSwitchToForgot={() => { setShowLogin(false); setShowForgot(true) }}
      />

      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSignupSuccess={() => {
            setIsLoggedIn(true)
            setShowSignup(false)
          }}
          onSwitchToLogin={() => {
            setShowSignup(false)
            setShowLogin(true)
          }}
        />
      )}

      {showForgot && (
        <ForgotPassword
          onClose={() => setShowForgot(false)}
          onSwitchToLogin={() => {
            setShowForgot(false)
            setShowLogin(true)
          }}
        />
      )}

      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<div style={{ paddingTop: '72px', minHeight: '100vh', background: '#fdf6ec' }} />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
=======
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            isLoggedIn
              ? <UserDashboard />
              : (
                <div style={{
                  paddingTop: '72px', minHeight: '100vh', background: '#fdf6ec',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Georgia, serif', color: '#4a2c17'
                }}>
                  Please log in to view your profile.
                </div>
              )
>>>>>>> 875f215d9328d267e32071fcdd5c1dcb2fc67500
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/new" element={<CreateRecipe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App