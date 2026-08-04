import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // path apne project ke hisab se change kar lena

export default function Login() {
  const navigate = useNavigate();

  const { login, loading, error } = useUser();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);

      alert("Login Successful");
      navigate("/");
    } catch (err) {
      // Error UserContext me handle ho raha hai
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-white">
          Welcome Back
        </h1>

        <p className="text-center text-slate-400 mt-2 mb-8">
          Login to continue
        </p>

        {error && (
          <div className="mb-5 bg-red-500/20 border border-red-500 text-red-300 rounded-lg p-3 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500 disabled:opacity-60"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500 disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-slate-700" />
          <span className="px-3 text-slate-400 text-sm">OR</span>
          <hr className="flex-1 border-slate-700" />
        </div>

        <p className="text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
