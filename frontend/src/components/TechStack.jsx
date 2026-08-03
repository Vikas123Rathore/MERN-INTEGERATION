import {
  Atom,
  Server,
  Database,
  Globe,
} from "lucide-react";

export default function TechStack() {
  const techs = [
    {
      icon: <Atom size={42} />,
      title: "React",
      desc: "Modern frontend library for building fast and interactive user interfaces.",
      color: "text-sky-400",
    },
    {
      icon: <Server size={42} />,
      title: "Node.js",
      desc: "JavaScript runtime that powers the backend efficiently.",
      color: "text-green-400",
    },
    {
      icon: <Globe size={42} />,
      title: "Express",
      desc: "Minimal and flexible framework for building REST APIs.",
      color: "text-orange-400",
    },
    {
      icon: <Database size={42} />,
      title: "MongoDB",
      desc: "NoSQL database used to securely store application data.",
      color: "text-emerald-400",
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-blue-400 uppercase tracking-widest font-semibold">
            Technology
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Built with the MERN Stack
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            PostHub is powered by modern web technologies that ensure speed,
            scalability, and a smooth user experience.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {techs.map((tech, index) => (
            <div
              key={index}
              className="group rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`${tech.color} mb-6`}>
                {tech.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {tech.title}
              </h3>

              <p className="text-slate-400 leading-7">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
