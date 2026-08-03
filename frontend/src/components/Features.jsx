import { PenSquare, BookOpen, Trash2, ShieldCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <PenSquare size={34} />,
      title: "Create Posts",
      description:
        "Write and publish posts quickly with an intuitive interface.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <BookOpen size={34} />,
      title: "View My Posts",
      description:
        "Browse all posts with a clean and responsive layout.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Trash2 size={34} />,
      title: "Delete Posts",
      description:
        "Remove unwanted posts instantly with secure API actions.",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "Secure Backend",
      description:
        "Powered by Express, MongoDB and REST APIs for reliability.",
      color: "from-emerald-500 to-green-500",
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-blue-400 font-semibold uppercase tracking-widest">
            Features
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Everything You Need to Manage Posts
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-lg">
            A simple and powerful platform built with the MERN Stack for
            creating, managing and organizing your content.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${item.color}`}
              >
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                {item.title}
              </h3>

              <p className="text-slate-400 mt-4 leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
