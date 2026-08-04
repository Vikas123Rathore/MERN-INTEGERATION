import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-400 font-bold"
        >
          PostHub
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>

          <Link to="/posts" className="hover:text-blue-400">
            Posts
          </Link>

          <Link to="/create" className="hover:text-blue-400">
            Create Post
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
          ) : (
            <div className="relative group">
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold cursor-pointer select-none">
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-64 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50">

                {/* User Info */}
                <div className="px-5 py-4 border-b border-slate-700">
                  <div className="font-semibold text-lg">
                    {user.name}
                  </div>

                  <div className="text-sm text-slate-400 break-all">
                    {user.email}
                  </div>
                </div>

                {/* Menu */}
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
