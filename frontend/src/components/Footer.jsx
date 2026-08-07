import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
  FaArrowUp,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { toast } from 'react-toastify'

export default function Footer() {
  const { user } = useUser()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleCreateClick = (e) => {
    if (!user) {
      e.preventDefault()
      toast.error('Please login first to create a post.')
    }
  }

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold">
              Post<span className="text-blue-400">Hub</span>
            </h2>

            <p className="text-slate-400 mt-4 leading-7">
              A modern MERN Stack platform where users can create, edit, manage
              and share posts with a clean, responsive experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-slate-400">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/posts" className="hover:text-blue-400">
                  All Posts
                </Link>
              </li>

              <li>
                <Link
                  to="/create"
                  onClick={handleCreateClick}
                  className="hover:text-blue-400"
                >
                  Create Post
                </Link>
              </li>

              <li>
                <Link to="/myposts" className="hover:text-blue-400">
                  My Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Connect With Me</h3>

            <div className="flex gap-4">
              <a
                href="https://github.com/Vikas123Rathore"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 p-3 rounded-full hover:bg-blue-600 transition"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/vikas-rathore-b01599394/"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 p-3 rounded-full hover:bg-blue-600 transition"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="mailto:your@email.com"
                className="bg-slate-800 p-3 rounded-full hover:bg-blue-600 transition"
              >
                <FaEnvelope size={20} />
              </a>
            </div>

            <p className="text-slate-400 mt-5">
              Built with React, Node.js, Express.js & MongoDB.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="flex items-center gap-2 text-slate-400">
            © {new Date().getFullYear()} PostHub • Made with
            <FaHeart className="text-red-500" />
            by Vikas Rathore
          </p>

          <button
            onClick={scrollToTop}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition cursor-pointer"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  )
}
