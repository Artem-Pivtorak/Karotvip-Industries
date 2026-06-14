import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

interface StatItemProps {
  end: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ end, suffix, label, delay }: StatItemProps) {
  const { count, ref } = useCountUp(end, 2);

  return (
    <div ref={ref} className="text-center">
      <div className="font-montserrat text-5xl sm:text-6xl font-extrabold tracking-[-2px] gradient-text animate-gradient-shift" style={{ backgroundSize: "200% 200%", animationDelay: `${delay}s` }}>
        {count}{suffix}
      </div>
      <div className="font-inter text-sm text-text-secondary mt-3">
        {label}
      </div>
    </div>
  );
}

const stats = [
  { end: 37, suffix: "+", label: "Implemented projects" },
  { end: 100, suffix: "+", label: "Clients" },
  { end: 7, suffix: "", label: "Countries" },
  { end: 3, suffix: "", label: "Years on the market" },
];

export function StatsSection() {
  const sectionRef = useScrollAnimation<HTMLElement>({ animation: "fadeInUp" });

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative py-20 lg:py-24 bg-dark-bg"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-orange/50 to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(155,77,255,0.06)_0%,transparent_70%)]" />
      
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/project_image.png')] bg-cover bg-center" />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <span className="block font-montserrat font-bold text-3xl sm:text-4xl lg:text-[40px] tracking-[-1.5px] text-white text-center mb-12">
          IN NUMBERS
        </span>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />
    </section>
  );
}
