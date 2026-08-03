import { ImagePlus, Send } from "lucide-react";

export default function CreatePost() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Create a <span className="text-blue-400">New Post</span>
          </h1>

          <p className="text-slate-400 mt-3">
            Share your thoughts by creating a new post.
          </p>
        </div>

        <form className="space-y-7">

          {/* Title */}
          <div>
            <label className="block mb-2 text-slate-300 font-medium">
              Post Title
            </label>

            <input
              type="text"
              placeholder="Enter your post title..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-slate-300 font-medium">
              Description
            </label>

            <textarea
              rows="6"
              placeholder="Write something amazing..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none resize-none focus:border-blue-500 transition"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-slate-300 font-medium">
              Upload Image
            </label>

            <label className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-slate-700 rounded-2xl p-8 cursor-pointer hover:border-blue-500 transition">

              <ImagePlus size={32} className="text-blue-400" />

              <div>
                <p className="font-semibold">
                  Click to upload an image
                </p>

                <p className="text-sm text-slate-400">
                  PNG, JPG or JPEG
                </p>
              </div>

              <input
                type="file"
                className="hidden"
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              type="reset"
              className="px-6 py-3 rounded-xl border border-slate-700 hover:border-red-500 transition"
            >
              Reset
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold transition"
            >
              <Send size={18} />
              Publish Post
            </button>

          </div>

        </form>

      </div>
    </section>
  );
}
