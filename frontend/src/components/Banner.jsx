import {
  PenSquare,
  ShieldCheck,
  Database,
  ArrowRight,
} from "lucide-react";

export default function Banner() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left Content */}
        <div>
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold border border-blue-500/30">
            🚀 MERN Stack Project
          </span>

          <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight">
            Create, Manage &
            <span className="text-blue-400"> Share Posts </span>
            Effortlessly.
          </h1>

          <p className="mt-6 text-lg text-slate-300 leading-8 max-w-xl">
            PostHub is a modern MERN application where users can create,
            organize and manage posts with a fast, responsive, and beautiful
            interface.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="border border-slate-600 hover:border-blue-500 hover:text-blue-400 px-6 py-3 rounded-xl transition">
              Explore Posts
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className="relative">
          <div className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"></div>

          <div className="relative bg-slate-900/70 backdrop-blur-lg border border-slate-700 rounded-3xl p-8 shadow-2xl">

            <div className="space-y-6">

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-800 hover:bg-slate-700 transition">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <PenSquare size={26} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">Create Posts</h3>
                  <p className="text-slate-400 text-sm">
                    Publish new content in seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-800 hover:bg-slate-700 transition">
                <div className="bg-green-600 p-3 rounded-xl">
                  <Database size={26} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">MongoDB Storage</h3>
                  <p className="text-slate-400 text-sm">
                    Securely store and manage every post.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-800 hover:bg-slate-700 transition">
                <div className="bg-purple-600 p-3 rounded-xl">
                  <ShieldCheck size={26} />
                </div>

                <div>
                  <h3 className="font-bold text-lg">Reliable Backend</h3>
                  <p className="text-slate-400 text-sm">
                    Built with Express and REST APIs.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
