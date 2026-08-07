import { useEffect, useState, useContext } from 'react'
import { ImagePlus, Send, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PostContext } from '../context/PostContext'
import { useUser } from '../context/UserContext'
import { toast } from 'react-toastify'

export default function CreatePost() {
  const { createPost, loading, error } = useContext(PostContext)
  const { user, loading: authLoading } = useUser()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)

  // Redirect logged-out users before they reach the form.
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Please login first to create a post.')
      navigate('/login', { replace: true })
    }
  }, [authLoading, navigate, user])

  if (authLoading || !user) {
    return (
      <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16">
        <div className="text-slate-400">Checking login status...</div>
      </section>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('title', title)
    formData.append('content', content)

    if (image) {
      formData.append('image', image)
    }

    try {
      await createPost(formData)
      setTitle('')
      setContent('')
      setImage(null)
      e.target.reset()
      navigate('/posts')
    } catch (err) {
      console.log(err)
    }
  }

  const handleReset = () => {
    setTitle('')
    setContent('')
    setImage(null)
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition mb-8 cursor-pointer"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Create a <span className="text-blue-400">New Post</span>
          </h1>

          <p className="text-slate-400 mt-3">
            Share your thoughts and publish something amazing.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-500/20 border border-red-500 p-4 text-red-300">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="space-y-7"
        >
          {/* Title */}
          <div>
            <label className="block mb-2 text-slate-300 font-medium">
              Post Title
            </label>

            <input
              type="text"
              placeholder="Enter your post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-2 text-slate-300 font-medium">
              Content
            </label>

            <textarea
              rows="6"
              placeholder="Write something amazing..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none resize-none focus:border-blue-500 transition"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-slate-300 font-medium">
              Upload Image (Optional)
            </label>

            <label className="flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed border-slate-700 rounded-2xl p-8 cursor-pointer hover:border-blue-500 transition">
              <ImagePlus size={36} className="text-blue-400" />

              <div className="text-center">
                <p className="font-semibold">Click to upload an image</p>

                <p className="text-sm text-slate-400">PNG, JPG or JPEG</p>
              </div>

              {image && (
                <p className="text-green-400 text-sm">Selected: {image.name}</p>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="reset"
              disabled={loading}
              className="px-6 py-3 rounded-xl border border-slate-700 hover:border-red-500 transition disabled:opacity-50 cursor-pointer"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed px-7 py-3 rounded-xl font-semibold transition cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
