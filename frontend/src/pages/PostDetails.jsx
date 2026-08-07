import { useEffect, useState } from 'react'
import { ArrowLeft, CalendarDays, User, Pencil, Trash2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePost } from '../context/PostContext'
import { useUser } from '../context/UserContext'

export default function PostDetails() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { getPostById, deletePost } = usePost()
  const { user } = useUser()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id)
        setPost(data)
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }

    fetchPost()
  }, [id])

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-950 flex justify-center items-center text-white">
        Loading...
      </section>
    )
  }

  if (!post) {
    return (
      <section className="min-h-screen bg-slate-950 flex justify-center items-center text-white">
        Post not found
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white py-14">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back */}
        <button
          onClick={() => navigate('/posts')}
          className="flex items-center gap-2 text-slate-300 hover:text-blue-400 mb-8 cursor-pointer"
        >
          <ArrowLeft size={20} />
          Back to Posts
        </button>

        {/* Card */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">
          {/* Heading */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
              📖 Post Details
            </span>

            <h1 className="text-5xl font-bold mt-4">
              Explore Every <span className="text-blue-400">Detail</span>
            </h1>

            <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
              Read the complete story, discover the author's insights, and dive
              into every detail of this post.
            </p>
          </div>
          {/* Image */}
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[450px] object-cover"
            />
          )}

          <div className="p-8">
            {/* Title */}
            <h1 className="text-4xl font-bold">{post.title}</h1>

            {/* Author + Date */}
            <div className="flex flex-wrap gap-6 mt-5 text-slate-400">
              <div className="flex items-center gap-2">
                <User size={18} />
                {post.authorId?.name}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Content */}
            <div className="mt-8 text-lg leading-9 text-slate-300 whitespace-pre-wrap">
              {post.content}
            </div>

            {/* Owner Buttons */}
            {user?._id === post.authorId?._id && (
              <div className="flex gap-4 mt-10">
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Pencil size={18} />
                  Edit
                </button>

                <button
                  onClick={async () => {
                    await deletePost(post._id)
                    navigate('/posts')
                  }}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
