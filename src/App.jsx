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
import { Toaster } from 'react-hot-toast'
import NetworkStatus from './components/NetworkStatus '
import Loader from './components/skeletons/Loader'
import ContactProfile from './pages/ContactProfile'

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuth()
  const { theme } = useTheme()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) return (
    <>
      <Navbar />
      <Loader />
    </>
  )

  return (
    <div className='w-full' data-theme={theme}>
      <Navbar />
      <NetworkStatus />

      <Routes className='z-30'>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
        <Route path='/contact/:username' element={authUser ? <ContactProfile /> : <Navigate to='/login' />} />
        <Route path='/setting' element={<SettingsPage />} />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(0, 0, 0, 0.877)',
            color: '#ccc',
            border: '1px solid #ffffff21'
          }
        }}
      />
    </div>
  )
}

export default App
