import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import useAuth from './store/useAuthStore'
import useTheme from './store/useThemeStore'
import { Loader2 } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuth()
  const { theme } = useTheme()


  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader2 className='size-10 animate-spin' />
    </div>
  )

  return (
    <div className='w-full' data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
        <Route path='/setting' element={<SettingsPage />} />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
