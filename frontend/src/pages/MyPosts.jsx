import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { usePost } from '../context/PostContext'
import PostCard from '../components/PostCard'

export default function MyPosts() {
  const navigate = useNavigate()

  const { user } = useUser()
  const { posts, loading } = usePost()

  // Reuse the shared post cache so My Posts stays in sync after create/delete.
  const myPosts = posts.filter(
    (post) => post.authorId?._id === user?._id || post.authorId === user?._id,
  )

  return (
    <section className="min-h-screen bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-5 mb-10">
          <button
            onClick={() => navigate('/')}
            className="bg-slate-800 p-3 rounded-full hover:bg-blue-600 transition cursor-pointer"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-5xl font-bold">
              My <span className="text-blue-400">Posts</span>
            </h1>

            <p className="text-slate-400 mt-2">
              Manage all posts you've created in one place.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400">
            Loading your posts...
          </div>
        ) : myPosts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold">No Posts Yet</h2>

            <p className="text-slate-400 mt-3">
              Create your first post and it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
