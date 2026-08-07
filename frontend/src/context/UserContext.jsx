import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const rawServerUrl = import.meta.env.VITE_SERVER_URL?.trim()
  const isDev = import.meta.env.DEV
  const serverUrl = rawServerUrl
    ? rawServerUrl.endsWith('/api')
      ? rawServerUrl
      : `${rawServerUrl}/api`
    : isDev
      ? 'http://localhost:8000/api'
      : ''

  useEffect(() => {
    if (!serverUrl && !isDev) {
      const message =
        'Deployment misconfiguration: VITE_SERVER_URL is missing in frontend environment variables.'

      console.error(message)
      setError(message)
    }
  }, [isDev, serverUrl])

  // Current User
  const getCurrentUser = async () => {
    if (!serverUrl) {
      return
    }

    try {
      setLoading(true)

      const res = await axios.get(serverUrl + '/user/current-user', {
        withCredentials: true,
      })

      setUser(res.data.user)
      setError('')
    } catch (err) {
      setUser(null)
      setError(err.response?.data?.message || '')
    } finally {
      setLoading(false)
    }
  }

  // Register
  const register = async (userData) => {
    if (!serverUrl) {
      setError('Server URL is missing. Please contact admin.')
      return null
    }

    try {
      setLoading(true)

      const res = await axios.post(serverUrl + '/user/register', userData, {
        withCredentials: true,
      })

      setUser(res.data.user)
      setError('')

      return res.data
    } catch (err) {
      console.log(err)

      setError(err.response?.data?.message || 'Registration failed')

      return null
    } finally {
      setLoading(false)
    }
  }

  // Login
  const login = async (userData) => {
    if (!serverUrl) {
      setError('Server URL is missing. Please contact admin.')
      return null
    }

    try {
      setLoading(true)

      const res = await axios.post(serverUrl + '/user/login', userData, {
        withCredentials: true,
      })

      setUser(res.data.user)
      setError('')

      return res.data
    } catch (err) {
      console.log(err)

      setError(err.response?.data?.message || 'Login failed')

      return null
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const logout = async () => {
    if (!serverUrl) {
      return
    }

    try {
      setLoading(true)

      await axios.post(
        serverUrl + '/user/logout',
        {},
        {
          withCredentials: true,
        },
      )

      setUser(null)
      setError('')
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || 'Logout failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        serverUrl,
        register,
        login,
        logout,
        getCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
