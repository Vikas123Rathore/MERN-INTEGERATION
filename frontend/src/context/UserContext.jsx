import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const serverUrl = import.meta.env.VITE_SERVER_URL;
  // Current User
  const getCurrentUser = async () => {
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
