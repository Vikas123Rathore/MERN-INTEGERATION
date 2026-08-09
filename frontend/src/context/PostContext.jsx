import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from './UserContext'
import { toast } from 'react-toastify'

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const { serverUrl } = useUser()

  // GET ALL POSTS
  const getAllPosts = async () => {
    try {
      setLoading(true)

      const res = await axios.get(serverUrl + '/api/post', {
        withCredentials: true,
      })

      setPosts(res.data.posts)
    } catch (error) {
      console.log(error)

      toast.error(error.response?.data?.message || 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  // CREATE POST
  const createPost = async (formData) => {
    try {
      setLoading(true)

      const res = await axios.post(serverUrl + '/api/post', formData, {
        withCredentials: true,
      })

      setPosts((prev) => [res.data.post, ...prev])

      toast.success('Post created successfully')

      return res.data
    } catch (error) {
      console.log(error)

      toast.error(error.response?.data?.message || 'Post creation failed or please login your')

      throw error
    } finally {
      setLoading(false)
    }
  }

  // UPDATE POST
  const updatePost = async (id, formData) => {
    try {
      setLoading(true)

      await axios.put(serverUrl + '/api/post/' + id, formData, {
        withCredentials: true,
      })

      await getAllPosts()

      toast.success('Post updated successfully')
    } catch (error) {
      console.log(error)

      toast.error(error.response?.data?.message || 'Post update failed')

      throw error
    } finally {
      setLoading(false)
    }
  }

  // DELETE POST
  const deletePost = async (id) => {
    try {
      await axios.delete(serverUrl + '/api/post/' + id, {
        withCredentials: true,
      })

      setPosts((prev) => prev.filter((post) => post._id !== id))

      toast.success('Post deleted successfully')
    } catch (error) {
      console.log(error)

      toast.error(error.response?.data?.message || 'Delete failed')
    }
  }

  // GET SINGLE POST
  const getPostById = async (id) => {
    try {
      const res = await axios.get(serverUrl + '/api/post/' + id, {
        withCredentials: true,
      })

      return res.data.post
    } catch (error) {
      console.log(error)

      toast.error(error.response?.data?.message || 'Post not found')

      throw error
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
        getPostById,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePost = () => useContext(PostContext)
