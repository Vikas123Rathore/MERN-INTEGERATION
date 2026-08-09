import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { usePost } from '../context/PostContext'
import PostCard from '../components/PostCard'

export default function Posts() {
  const navigate = useNavigate()
  const { posts, loading } = usePost()

  return (
    <section className="min-h-screen bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition mb-8 cursor-pointer"
        >
          <ArrowLeft size={22} />
          Back to Home
        </button>

        {/* Heading */}
        <div className="text-center">
          <span className="inline-block px-4 py-2 mb-5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-semibold">
            📝 PostHub Community
          </span>

          <h1 className="text-5xl font-extrabold">
            Explore All <span className="text-blue-400">Posts</span>
          </h1>

          <p className="mt-5 text-lg text-slate-400 max-w-2xl mx-auto">
            Discover ideas, read community stories, and interact with posts
            created by different creators.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mt-12 mb-10">
          <div className="h-px bg-slate-700 flex-1"></div>

          <span className="text-slate-500 text-sm">Latest Community Posts</span>

          <div className="h-px bg-slate-700 flex-1"></div>
        </div>

        {loading ? (
          <div className="text-center text-slate-400">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-slate-400">No posts available</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
