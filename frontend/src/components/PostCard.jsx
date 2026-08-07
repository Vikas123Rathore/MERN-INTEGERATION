import { Trash2, Pencil, Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { usePost } from "../context/PostContext";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  const { user } = useUser();
  const { deletePost } = usePost();

  const isOwner = user?._id === post.authorId?._id;

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500 transition">

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-52 object-cover"
        />
      )}

      <div className="p-6">

        <h2 className="text-2xl font-bold">
          {post.title}
        </h2>

        <p className="text-slate-400 mt-3">
          {post.content}
        </p>

        <div className="flex justify-between items-center mt-6">

          <span className="text-blue-400">
            {post.authorId?.name}
          </span>

          {isOwner ? (
            <div className="flex gap-3">

              <button
                onClick={() => navigate(`/edit/${post._id}`)}
                className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-xl cursor-pointer"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => deletePost(post._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl cursor-pointer"
              >
                <Trash2 size={18} />
              </button>

            </div>
          ) : (
            <div className="flex gap-3">

              <button className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-xl">
                <Heart size={18} />
              </button>

              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl">
                <MessageCircle size={18} />
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
