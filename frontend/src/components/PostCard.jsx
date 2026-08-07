import { Trash2, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { usePost } from '../context/PostContext'
import { useUser } from '../context/UserContext'

export default function PostCard({ post }) {
  const navigate = useNavigate()

  const { deletePost } = usePost()
  const { user } = useUser()

  return (
    <div
      className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500 transition duration-300 cursor-pointer flex flex-col"
      onClick={() => navigate(`/post/${post._id}`)}
    >
      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-56 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-2xl font-bold line-clamp-2">{post.title}</h2>

        <p className="text-slate-400 mt-3 leading-7 line-clamp-4">
          {post.content}
        </p>

        {/* Read More */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/post/${post._id}`)
          }}
          className="text-blue-400 mt-3 text-sm font-semibold text-left hover:text-blue-300 flex items-center gap-2"
        >
          <Eye size={16} />
          Read More
        </button>

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto pt-6">
          <span className="text-green-400 font-medium capitalize">
            {post.authorId?.name}
          </span>

          <div className="flex gap-3">
            {user?._id === post.authorId?._id ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/edit/${post._id}`)
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePost(post._id)
                  }}
                  className="bg-red-600 hover:bg-red-700 p-3 rounded-xl transition cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  Like
                </button>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  Comment
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
