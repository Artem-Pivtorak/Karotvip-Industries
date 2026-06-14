import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GradientText } from "@/components/custom/GradientText";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "NeuroCore",
    category: "AI / Машинне навчання",
    image: "/project-neurocore.jpg",
  },
  {
    title: "Raynous",
    category: "Fintech",
    image: "/project-raynous.jpg",
  },
  {
    title: "Synapse ICT",
    category: "IoT / Хмарні рішення",
    image: "/project-synapse.jpg",
  },
  {
    title: "Lumina Store",
    category: "E-commerce",
    image: "/project-lumina.jpg",
  },
];

export function ProjectsSection() {
  const headerRef = useScrollAnimation<HTMLDivElement>({ animation: "fadeInUp" });
  const cardsRef = useScrollAnimation<HTMLDivElement>({
    animation: "fadeInUp",
    stagger: 0.12,
    delay: 0.2,
  });

  return (
    <section
      ref={headerRef}
      id="projects"
      className="relative py-24 lg:py-32 bg-dark-secondary"
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,212,255,0.05)_0%,transparent_50%)]" />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 lg:mb-16">
          <div>
            {/* Label */}
            <span className="inline-block font-mono text-xs uppercase tracking-[2px] text-[#473090] mb-4">
              Portfolio
            </span>

            {/* Title */}
            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl lg:text-[40px] tracking-[-1.5px] text-white">
              IDEAS THAT BECAME{" "}
              <GradientText>REALITY</GradientText>
            </h2>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-3 self-start sm:self-auto">
            <img src="/bot.png" alt="Bot" className="w-10 h-10 object-contain" />
            <button className="font-inter text-sm font-semibold uppercase tracking-wider text-white px-6 py-3 border border-white/30 hover:border-neon-orange hover:text-neon-orange transition-all duration-300">
              All projects
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative bg-dark-bg overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Arrow icon on hover */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight size={18} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="font-mono text-[10px] uppercase tracking-[1px] text-text-muted mb-1 block">
                  {project.category}
                </span>
                <h3 className="font-montserrat font-semibold text-lg text-white group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
