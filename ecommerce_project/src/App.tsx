import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import OrdersList from './components/orders/OrdersList'
import SeedDatabase from './components/admin/SeedDatabase'
import Logo from './components/layout/Logo'
import { useAuth } from './contexts/AuthContext'

const App: React.FC = () => {
  console.log('App component rendering');
  
  const [showAdmin, setShowAdmin] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  const { currentUser, login, logout, signup } = useAuth()
  console.log('Auth loaded, currentUser:', currentUser);
  
  // Check if user is admin
  const isAdmin = currentUser && currentUser.email === "admin@cpsc449.com"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    
    try {
      const { error } = await login(email, password)
      if (error) {
        setErrorMessage(error.message)
        return
      }
      setShowLoginForm(false)
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Login error:', error)
      setErrorMessage('An unexpected error occurred during login')
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    
    try {
      const { error } = await signup(email, password)
      if (error) {
        setErrorMessage(error.message)
        return
      }
      setShowSignupForm(false)
      setEmail('')
      setPassword('')
      // Show success message or redirect
      alert('Account created successfully! Check your email for confirmation.')
    } catch (error) {
      console.error('Signup error:', error)
      setErrorMessage('An unexpected error occurred during signup')
    }
  }

  const handleLogout = async () => {
    setErrorMessage(null)
    
    try {
      const { error } = await logout()
      if (error) {
        setErrorMessage(error.message)
        return
      }
      setShowAdmin(false)
    } catch (error) {
      console.error('Logout error:', error)
      setErrorMessage('An unexpected error occurred during logout')
    }
  }

  // Auth form modal content
  const renderAuthForm = (isLogin: boolean) => {
    const formTitle = isLogin ? 'Login' : 'Sign Up'
    const handleSubmit = isLogin ? handleLogin : handleSignup
    const switchMessage = isLogin 
      ? "Don't have an account?" 
      : "Already have an account?"
    const switchAction = isLogin
      ? () => {
          setShowLoginForm(false)
          setShowSignupForm(true)
          setErrorMessage(null)
        }
      : () => {
          setShowSignupForm(false)
          setShowLoginForm(true)
          setErrorMessage(null)
        }
    const switchButtonText = isLogin ? 'Sign Up' : 'Login'
    
    return (
      <div className="login-modal" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '400px'
        }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>{formTitle}</h2>
          
          {errorMessage && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#ffebee',
              color: '#c62828',
              borderRadius: '4px',
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}>
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>
                Email:
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                required
              />
              {isLogin && (
                <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '0.3rem' }}>
                  Use admin@cpsc449.com to access admin features
                </p>
              )}
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555' }}>
                Password:
              </label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
                required
              />
              {isLogin && (
                <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '0.3rem' }}>
                  Any password will work for admin@cpsc449.com
                </p>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <button 
                type="button" 
                onClick={() => {
                  isLogin ? setShowLoginForm(false) : setShowSignupForm(false)
                  setErrorMessage(null)
                }}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f1f1f1',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {formTitle}
              </button>
            </div>
            
            <div style={{ textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.5rem' }}>
                {switchMessage}
              </p>
              <button
                type="button"
                onClick={switchAction}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#3498db',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  textDecoration: 'underline'
                }}
              >
                {switchButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-logo">
            <Logo size="medium" />
          </div>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/support">Support</Link></li>
            <li>
              <Link to="/cart" className="cart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link 
                  to="#" 
                  className="admin-link" 
                  onClick={(e) => {
                    e.preventDefault()
                    setShowAdmin(!showAdmin)
                  }}
                >
                  Admin
                </Link>
              </li>
            )}
            <li>
              {currentUser ? (
                <button 
                  onClick={handleLogout}
                  style={{ 
                    backgroundColor: '#2c3e50', 
                    color: 'white', 
                    border: 'none', 
                    padding: '5px 10px', 
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={() => setShowLoginForm(true)}
                  style={{ 
                    backgroundColor: '#3498db', 
                    color: 'white', 
                    border: 'none', 
                    padding: '5px 10px', 
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </nav>

        {/* Auth Forms */}
        {showLoginForm && renderAuthForm(true)}
        {showSignupForm && renderAuthForm(false)}
        
        {/* Admin Dashboard */}
        {showAdmin && isAdmin && (
          <div className="admin-dashboard container">
            <h1>Admin Dashboard</h1>
            <div className="admin-panels">
              <div className="admin-panel">
                <SeedDatabase />
              </div>
              <div className="admin-panel">
                <OrdersList />
              </div>
            </div>
          </div>
        )}
        
        <main className="main-content">
          {/* Only show main content if admin dashboard is not active */}
          {!showAdmin && (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<HomePage />} />
              <Route path="/support" element={<div className="container"><h1>Support</h1><p>Coming soon...</p></div>} />
              <Route path="/cart" element={<div className="container"><h1>Shopping Cart</h1><p>Your cart is empty.</p></div>} />
            </Routes>
          )}
        </main>
        
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <Logo size="small" />
              <p>© 2025 CPSC 449. All rights reserved.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/support">Support</Link></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
