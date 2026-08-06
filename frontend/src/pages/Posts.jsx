import { Trash2, ArrowLeft, Eye } from 'lucide-react'
import { usePost } from '../context/PostContext'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function Posts() {
  const { posts, loading, deletePost } = usePost()
  const { user } = useUser()

  const navigate = useNavigate()

  return (
    <section className="min-h-screen bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button + Heading */}
        <div className="mb-14">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition mb-8"
          >
            <ArrowLeft size={22} />
            <span className="font-medium">Back to Home</span>
          </button>

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

          {/* Line */}
          <div className="flex items-center gap-4 mt-12">
            <div className="h-px bg-slate-700 flex-1"></div>

            <span className="text-slate-500 text-sm">
              Latest Community Posts
            </span>

            <div className="h-px bg-slate-700 flex-1"></div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-slate-400">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-slate-400">No posts available</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500 transition"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover"
                  />
                )}

                <div className="p-6">
                  <h2 className="text-2xl font-bold">{post.title}</h2>

                  <p className="text-slate-400 mt-3 line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-green-400 font-medium capitalize">
                      {post.authorId?.name}
                    </span>

                    <div className="flex gap-3">
                      {user?._id === post.authorId?._id ? (
                        <>
                          <button
                            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-xl transition cursor-pointer"
                            onClick={() => navigate('/edit')}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deletePost(post._id)}
                            className="bg-red-600 hover:bg-red-700 p-3 rounded-xl transition cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition">
                            Like
                          </button>

                          <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition">
                            Comment
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
