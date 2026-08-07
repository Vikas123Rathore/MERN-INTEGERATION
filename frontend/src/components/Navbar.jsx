import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { toast } from 'react-toastify'

export default function Navbar() {
  const { user, logout } = useUser()

  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
  }

  const handleCreateClick = (e) => {
    if (!user) {
      e.preventDefault()
      toast.error('Please login first to create a post.')
    }
  }

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold hover:text-blue-400 transition"
        >
          Post<span className="text-blue-400">Hub</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>

          <Link to="/posts" className="hover:text-blue-400 transition">
            Posts
          </Link>

          <Link
            to="/create"
            onClick={handleCreateClick}
            className="hover:text-blue-400 transition"
          >
            Create Post
          </Link>

          {user && (
            <Link to="/myposts" className="hover:text-blue-400 transition">
              My Posts
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative group">
              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold cursor-pointer">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div className="absolute right-0 mt-3 w-64 bg-slate-800 rounded-xl border border-slate-700 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                <div className="px-5 py-4 border-b border-slate-700">
                  <h3 className="font-semibold">{user.name}</h3>

                  <p className="text-sm text-slate-400 break-all">
                    {user.email}
                  </p>
                </div>

                <div className="p-2">
                  <Link
                    to="/myposts"
                    className="block px-4 py-3 rounded-lg hover:bg-slate-700"
                  >
                    My Posts
                  </Link>

                  <Link
                    to="/create"
                    onClick={handleCreateClick}
                    className="block px-4 py-3 rounded-lg hover:bg-slate-700"
                  >
                    Create Post
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-5 space-y-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            to="/posts"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-400"
          >
            Posts
          </Link>

          <Link
            to="/create"
            onClick={handleCreateClick}
            onClick={() => setMenuOpen(false)}
            className="block hover:text-blue-400"
          >
            Create Post
          </Link>

          {user && (
            <Link
              to="/myposts"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-blue-400"
            >
              My Posts
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block bg-blue-600 text-center py-3 rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          ) : (
            <>
              <div className="border-t border-slate-700 pt-4">
                <p className="font-semibold">{user.name}</p>

                <p className="text-sm text-slate-400 break-all">{user.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg"
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
