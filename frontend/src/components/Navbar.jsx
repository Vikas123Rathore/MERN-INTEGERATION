import { Link } from 'react-router-dom'
import { UserCircle } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className=" flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-blue-400">
          PostHub
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-lg">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>

          <Link to="/posts" className="hover:text-blue-400 transition">
            Posts
          </Link>

          <Link to="/create" className="hover:text-blue-400 transition">
            Create Post
          </Link>
          {/* User */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition">
            <UserCircle size={28} />
            <span>User</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
