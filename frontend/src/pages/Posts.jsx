import { Trash2, Eye } from "lucide-react";

export default function Posts() {
  // Dummy data (baad me API se replace karenge)
  const posts = [
    {
      _id: 1,
      title: "Getting Started with MERN",
      description:
        "Learn how to build a complete MERN Stack application from scratch.",
      author: "Vikas Rathore",
    },
    {
      _id: 2,
      title: "Understanding Express.js",
      description:
        "Explore Express routing, middleware, and REST APIs in depth.",
      author: "John Doe",
    },
    {
      _id: 3,
      title: "MongoDB CRUD Operations",
      description:
        "Master Create, Read, Update, and Delete operations with MongoDB.",
      author: "Jane Smith",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold">
            All <span className="text-blue-400">Posts</span>
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Discover, manage and organize all your published posts.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-7 hover:border-blue-500 transition duration-300"
            >
              <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-sm">
                #{post._id}
              </span>

              <h2 className="text-2xl font-bold mt-5">
                {post.title}
              </h2>

              <p className="text-slate-400 mt-4 leading-7">
                {post.description}
              </p>

              <div className="mt-6 flex justify-between items-center">
                <span className="text-blue-400 font-medium">
                  {post.author}
                </span>

                <div className="flex gap-3">

                  <button className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl transition">
                    <Eye size={20} />
                  </button>

                  <button className="bg-red-600 hover:bg-red-700 p-3 rounded-xl transition">
                    <Trash2 size={20} />
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
