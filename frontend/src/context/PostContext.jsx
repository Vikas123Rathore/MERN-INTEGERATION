import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const PostContext = createContext()

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  // GET ALL POSTS
  const getAllPosts = async () => {
    try {
      setLoading(true)

      const { data } = await API.get('/post')
      console.log('post', data.posts)
      setPosts(data.posts)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  // CREATE POST
  const createPost = async (formData) => {
    try {
      setLoading(true)

      const { data } = await API.post('/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setPosts((prev) => [data.post, ...prev])

      return data
    } catch (error) {
      console.log(error)
      throw error
    }

    setLoading(false)
  }

  // DELETE POST
  const deletePost = async (id) => {
    try {
      await API.delete(`/post/${id}`)

      setPosts((prev) => prev.filter((post) => post._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  // Context load hote hi posts fetch honge
  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        createPost,
        deletePost,
        getAllPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePost = () => useContext(PostContext)
