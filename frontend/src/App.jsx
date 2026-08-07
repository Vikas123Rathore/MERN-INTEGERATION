import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost'
import User from './pages/User'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import EditPost from './pages/EditPost'
import MyPosts from './pages/MyPosts'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/myposts" element={<MyPosts />} />
      </Routes>
    </>
  )
}

export default App
