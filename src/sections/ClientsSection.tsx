import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const clients = [
  "NovaPay",
  "UFuture",
  "monobank",
  "KERNEL",
  "GENESIS",
  "AJAX",
];

export function ClientsSection() {
  const sectionRef = useScrollAnimation<HTMLElement>({
    animation: "fadeInUp",
    stagger: 0.08,
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-20 bg-dark-bg"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clients logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
          {clients.map((client) => (
            <span
              key={client}
              className="font-montserrat text-lg sm:text-xl font-bold uppercase text-text-muted hover:text-white transition-colors duration-300 cursor-default"
            >
              {client}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />
    </section>
  );
}
