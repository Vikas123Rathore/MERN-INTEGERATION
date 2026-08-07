import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { toast } from 'react-toastify'

export default function Navbar() {
  // Get logged-in user and logout function
  const { user, logout } = useUser()

  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false)

  // Logout user
  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
  }

  // Check login before opening Create Post page
  const handleCreateClick = (e) => {
    if (!user) {
      e.preventDefault()
      toast.error('Please login first to create a post.')
      setMenuOpen(false)
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-white hover:text-blue-400 transition"
        >
          Post<span className="text-blue-400">Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-white hover:text-blue-400 transition cursor-pointer"
          >
            Home
          </Link>

          <Link
            to="/posts"
            className="text-white hover:text-blue-400 transition cursor-pointer"
          >
            Posts
          </Link>

          <Link
            to="/create"
            onClick={handleCreateClick}
            className="text-white hover:text-blue-400 transition cursor-pointer"
          >
            Create Post
          </Link>

          {user && (
            <Link
              to="/myposts"
              className="text-white hover:text-blue-400 transition cursor-pointer"
            >
              My Posts
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition cursor-pointer"
            >
              Login
            </Link>
          ) : (
            <div className="relative group">
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold text-white cursor-pointer select-none">
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {/* User Info */}
                <div className="px-5 py-4 border-b border-slate-700">
                  <h3 className="font-semibold text-lg text-white">
                    {user.name}
                  </h3>

                  <p className="text-sm text-slate-300 break-all">
                    {user.email}
                  </p>
                </div>

                {/* Menu */}
                <div className="p-2">
                  <Link
                    to="/myposts"
                    className="block px-4 py-3 rounded-lg text-white hover:bg-slate-700 transition cursor-pointer"
                  >
                    My Posts
                  </Link>

                  <Link
                    to="/create"
                    onClick={handleCreateClick}
                    className="block px-4 py-3 rounded-lg text-white hover:bg-slate-700 transition cursor-pointer"
                  >
                    Create Post
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-lg text-white hover:bg-red-600 transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white hover:text-blue-400 transition cursor-pointer"
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-5 space-y-5">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-white hover:text-blue-400 transition cursor-pointer"
          >
            Home
          </Link>

          <Link
            to="/posts"
            onClick={() => setMenuOpen(false)}
            className="block text-white hover:text-blue-400 transition cursor-pointer"
          >
            Posts
          </Link>

          <Link
            to="/create"
            onClick={handleCreateClick}
            className="block text-white hover:text-blue-400 transition cursor-pointer"
          >
            Create Post
          </Link>

          {user && (
            <Link
              to="/myposts"
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:text-blue-400 transition cursor-pointer"
            >
              My Posts
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg transition cursor-pointer"
            >
              Login
            </Link>
          ) : (
            <>
              {/* User Details */}
              <div className="border-t border-slate-700 pt-4">
                <p className="font-semibold text-white">{user.name}</p>

                <p className="text-sm text-slate-300 break-all">{user.email}</p>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
