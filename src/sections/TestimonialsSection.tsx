import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GradientText } from "@/components/custom/GradientText";

const testimonials = [
  {
    text: "Команда Karotyp перевершила всі наші очікування. Розроблене рішення значно підвищило ефективність нашого бізнесу та дало конкурентну перевагу на ринку.",
    author: "Олексій В.",
    role: "CEO TechVision",
  },
  {
    text: "Професійний підхід, інноваційні рішення та відмінна комунікація на всіх етапах проєкту. Рекомендуємо!",
    author: "Марина К.",
    role: "CTO DataFlow",
  },
  {
    text: "Співпраця з Karotyp стала переломним моментом для нашої компанії. Цифрова трансформація пройшла швидко та ефективно.",
    author: "Ігор М.",
    role: "Директор InnovateLab",
  },
];

export function TestimonialsSection() {
  const headerRef = useScrollAnimation<HTMLDivElement>({ animation: "fadeInUp" });
  const cardsRef = useScrollAnimation<HTMLDivElement>({
    animation: "fadeInUp",
    stagger: 0.12,
    delay: 0.2,
  });

  return (
    <section
      ref={headerRef}
      id="testimonials"
      className="relative py-24 lg:py-32 bg-dark-secondary"
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,45,120,0.05)_0%,transparent_50%)]" />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <span className="inline-block font-mono text-xs uppercase tracking-[2px] text-neon-orange mb-4">
          Відгуки
        </span>

        {/* Title */}
        <h2 className="font-montserrat font-bold text-3xl sm:text-4xl lg:text-[40px] tracking-[-1.5px] text-white mb-12 lg:mb-16">
          НАМ ДОВІРЯЮТЬ{" "}
          <GradientText variant="orange-pink">РЕЗУЛЬТАТ</GradientText>
        </h2>

        {/* Testimonial Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-dark-card border border-white/[0.08] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-neon-orange/30"
            >
              {/* Quote marks */}
              <div className="font-montserrat text-5xl leading-none gradient-text-orange-pink mb-4">
                &ldquo;
              </div>

              {/* Text */}
              <p className="font-inter text-base text-text-secondary italic leading-relaxed mb-6">
                {testimonial.text}
              </p>

              {/* Author */}
              <div>
                <div className="font-inter text-sm font-semibold text-white">
                  {testimonial.author}
                </div>
                <div className="font-inter text-xs text-text-muted mt-1">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
