import { Trash2, Eye } from "lucide-react";

export default function Posts() {
  const posts = [
    {
      _id: 1,
      title: "Getting Started with MERN",
      description:
        "Learn how to build a complete MERN Stack application from scratch.",
      author: "Vikas Rathore",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    },
    {
      _id: 2,
      title: "Understanding Express.js",
      description:
        "Explore Express routing, middleware, and REST APIs in depth.",
      author: "John Doe",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    },
    {
      _id: 3,
      title: "MongoDB CRUD Operations",
      description:
        "Master Create, Read, Update, and Delete operations with MongoDB.",
      author: "Jane Smith",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold">
            All <span className="text-blue-400">Posts</span>
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Discover, manage and organize all your published posts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-sm">
                  #{post._id}
                </span>

                <h2 className="text-2xl font-bold mt-4">
                  {post.title}
                </h2>

                <p className="text-slate-400 mt-3 line-clamp-3">
                  {post.description}
                </p>

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-blue-400 font-medium">
                    {post.author}
                  </span>

                  <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl transition">
                      <Eye size={18} />
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 p-3 rounded-xl transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
