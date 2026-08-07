import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext' // path apne project ke hisab se change kar lena
import { toast } from 'react-toastify'

export default function SignUp() {
  const navigate = useNavigate()

  const { register, loading, error } = useUser()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await register(form)

    if (!result) {
      toast.error('Registration failed. Please check the form details.')
      return
    }

    toast.success('Account created successfully')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-white">
          Create Account
        </h1>

        <p className="text-center text-slate-400 mt-2 mb-8">
          Join PostHub today
        </p>

        {error && (
          <div className="mb-5 bg-red-500/20 border border-red-500 text-red-300 rounded-lg p-3 text-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full mb-4 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500 disabled:opacity-60"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full mb-4 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500 disabled:opacity-60"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full mb-6 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500 disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-slate-700" />
          <span className="px-3 text-slate-400 text-sm">OR</span>
          <hr className="flex-1 border-slate-700" />
        </div>

        <p className="text-center text-slate-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
