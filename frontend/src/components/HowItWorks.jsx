import {
  FilePlus2,
  Database,
  Eye,
  Trash2,
  ArrowRight,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FilePlus2 size={32} />,
      title: "Create Post",
      desc: "Fill in the title and description to publish a new post.",
      color: "bg-blue-600",
    },
    {
      icon: <Database size={32} />,
      title: "Save to MongoDB",
      desc: "Your post is securely stored using the backend API.",
      color: "bg-green-600",
    },
    {
      icon: <Eye size={32} />,
      title: "View Posts",
      desc: "Browse all your saved posts in one place.",
      color: "bg-purple-600",
    },
    {
      icon: <Trash2 size={32} />,
      title: "Delete Anytime",
      desc: "Remove posts instantly whenever you want.",
      color: "bg-red-600",
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-blue-400 uppercase tracking-widest font-semibold">
            Workflow
          </span>

          <h2 className="text-4xl font-bold mt-3">
            How PostHub Works
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Manage your posts in four simple steps using a complete MERN Stack
            workflow.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid lg:grid-cols-4 gap-8 items-center">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div
                className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg`}
              >
                {step.icon}
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-slate-400 leading-7">
                {step.desc}
              </p>

              {index !== steps.length - 1 && (
                <ArrowRight
                  size={28}
                  className="hidden lg:block absolute top-10 -right-6 text-blue-400"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
