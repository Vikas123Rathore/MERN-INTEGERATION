import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from './UserContext'

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const { serverUrl } = useUser()

  // GET ALL POSTS
  const getAllPosts = async () => {
    try {
      setLoading(true)

      const res = await axios.get(serverUrl + '/post', {
        withCredentials: true,
      })

      setPosts(res.data.posts)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  // CREATE POST
  const createPost = async (formData) => {
    try {
      setLoading(true)

      const res = await axios.post(serverUrl + '/post', formData, {
        withCredentials: true,
      })

      setPosts((prev) => [res.data.post, ...prev])

      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }

    setLoading(false)
  }

  // UPDATE POST
  const updatePost = async (id, formData) => {
    try {
      setLoading(true)

      const res = await axios.put(serverUrl + '/post/' + id, formData, {
        withCredentials: true,
      })
      await getAllPosts()
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  // DELETE POST
  const deletePost = async (id) => {
    try {
      await axios.delete(serverUrl + '/post/' + id, {
        withCredentials: true,
      })

      setPosts(posts.filter((post) => post._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        getAllPosts,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePost = () => useContext(PostContext)
