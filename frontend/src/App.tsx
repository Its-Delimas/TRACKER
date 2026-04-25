import { useState, useEffect } from 'react'
import Dashboard from './pages/Dashboard.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'

type View = 'login' | 'register' | 'dashboard'

export default function App() {
  const [view, setView] = useState<View>('login')
  const [email, setEmail] = useState<string>('')

  const handleLogin = (userEmail: string) => {
    setEmail(userEmail)
    setView('dashboard')
  }

  const handleRegister = (userEmail: string) => {
    setEmail(userEmail)
    setView('dashboard')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setView('dashboard')
    }
  }, [])


  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setView('login')
  }
  if (view === 'login') {
    return (
      <Login onLogin={handleLogin} onSwitch={() => setView('register')} />
    )
  }

  if (view === 'register') {
    return (
      <Register onRegister={handleRegister} onSwitch={() => setView('login')} />
    )
  }

  return <Dashboard onLogout={handleLogout} email={email} />
}