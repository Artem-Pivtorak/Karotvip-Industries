import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GradientText } from "@/components/custom/GradientText";

const services = [
  {
    image: "/Product-development.png",
    title: "Product development",
    description: "We create software products from idea to launch",
    color: "#FF6B35",
  },
  {
    image: "/Web-and-mobile.png",
    title: "Web and mobile applications",
    description: "We develop modern web and mobile solutions - that will suit everyone!",
    color: "#9B4DFF",
  },
  {
    image: "/Artificial-Intelligence.png",
    title: "Artificial Intelligence and Analytics",
    description: "We implement AI solutions to automate, accelerate and increase quality",
    color: "#00D4FF",
  },
  {
    image: "/Cloud-solutions.png",
    title: "Cloud solutions and databases",
    description: "API Connections and Cloud Databases",
    color: "#FF2D78",
  },
];

export function ServicesSection() {
  const sectionRef = useScrollAnimation<HTMLElement>({ animation: "fadeInUp" });
  const cardsRef = useScrollAnimation<HTMLDivElement>({
    animation: "fadeInUp",
    stagger: 0,
    delay: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 lg:py-32 bg-dark-secondary"
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,53,0.05)_0%,transparent_50%)]" />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <span className="inline-block font-mono text-xs uppercase tracking-[2px] text-[#473090] mb-4">
          Our solutions
        </span>

        {/* Title */}
        <h2 className="font-montserrat font-bold text-3xl sm:text-4xl lg:text-[40px] tracking-[-1.5px] text-white mb-4">
          DECISIONS THAT{" "}
          <GradientText variant="orange-pink">CHANGE</GradientText>{" "}
          THE RULES
        </h2>

        {/* Subtitle */}
        <p className="font-inter text-base text-text-secondary max-w-[600px] mb-12 lg:mb-16">
          We combine technical expertise and product thinking to create solutions that don’t just work, but deliver measurable results. Website and app development, custom software, business process automation, integrations and digital transformation — we take care of the technical side so you can focus on quality and comfort
        </p>

        {/* Service Cards */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-dark-card border-2 p-8 min-h-[280px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer overflow-hidden flex flex-col justify-end"
              style={{
                borderColor: service.color,
              }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${service.image}')`,
                }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${service.color}40, transparent)`,
                }}
              />

              {/* Title */}
              <h3 className="relative font-montserrat font-semibold text-lg text-white mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative font-inter text-sm text-text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
