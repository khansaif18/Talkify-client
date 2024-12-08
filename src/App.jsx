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
import NetworkStatus from './components/NetworkStatus '
import Loader from './components/skeletons/Loader'

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuth()
  const { theme } = useTheme()


  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) return (
    <div className='flex flex-col items-center justify-center h-screen gap-1'>
      <Loader />
      <h2>Please Wait For a Momenet</h2>
      <p>It Might Take Upto a Min (Only For The First Time)</p>
    </div>
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
