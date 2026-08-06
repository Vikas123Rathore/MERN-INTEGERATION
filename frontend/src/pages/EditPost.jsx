import { ImagePlus, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditPost() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10">

        {/* Header */}
        <div className="mb-10">

          <button
            onClick={() => navigate("/posts")}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-400 mb-6 transition cursor-pointer"
          >
            <ArrowLeft size={20} />
            Back to Posts
          </button>


          <div className="text-center">
            <h1 className="text-4xl font-bold">
              Edit <span className="text-blue-400">Post</span>
            </h1>

            <p className="text-slate-400 mt-3">
              Update your post details and keep your content fresh.
            </p>
          </div>

        </div>


        <form className="space-y-7">


          {/* Title */}

          <div>
            <label className="block mb-2 text-slate-300 font-medium">
              Post Title
            </label>

            <input
              type="text"
              placeholder="Update your post title..."
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
              placeholder="Update your post content..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 outline-none resize-none focus:border-blue-500 transition"
            />

          </div>



          {/* Image Upload */}

          <div>

            <label className="block mb-2 text-slate-300 font-medium">
              Change Image
            </label>


            <label className="flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed border-slate-700 rounded-2xl p-8 cursor-pointer hover:border-blue-500 transition">


              <ImagePlus
                size={36}
                className="text-blue-400"
              />


              <div className="text-center">

                <p className="font-semibold">
                  Upload new image
                </p>

                <p className="text-sm text-slate-400">
                  PNG, JPG or JPEG
                </p>

              </div>


              <input
                type="file"
                accept="image/*"
                className="hidden"
              />

            </label>


          </div>



          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-4">


            <button
              type="button"
              onClick={() => navigate("/posts")}
              className="px-6 py-3 rounded-xl border border-slate-700 hover:border-red-500 transition"
            >
              Cancel
            </button>


            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-semibold transition"
            >

              <Save size={18}/>

              Update Post

            </button>


          </div>


        </form>

      </div>

    </section>
  );
}
