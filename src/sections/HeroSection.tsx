import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        titleLine1Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.2"
      )
      .fromTo(
        titleLine2Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.45"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        "-=0.2"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        decorRef.current?.querySelectorAll(".decor-line") || [],
        { scaleX: 0 },
        { scaleX: 1, duration: 1, stagger: 0.1 },
        "-=0.5"
      );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-dark-bg overflow-hidden pt-[72px]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(155,77,255,0.08)_0%,transparent_70%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none">
        <div className="decor-line absolute top-[20%] left-0 w-[200px] h-[1px] bg-gradient-to-r from-neon-orange/50 to-transparent origin-left" />
        <div className="decor-line absolute bottom-[30%] right-0 w-[150px] h-[1px] bg-gradient-to-l from-neon-pink/50 to-transparent origin-right" />
        <div className="decor-line absolute top-[40%] right-[10%] w-[1px] h-[100px] bg-gradient-to-b from-neon-purple/30 to-transparent origin-top" />

        {/* Floating geometric elements */}
        <div className="absolute top-[15%] left-[8%] w-3 h-3 border border-neon-orange/40 rotate-45 animate-float" />
        <div className="absolute bottom-[25%] left-[15%] w-2 h-2 bg-neon-pink/30 rotate-12 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[60%] right-[5%] w-4 h-4 border border-neon-blue/30 animate-spin-slow" />

        {/* Vertical line with markers */}
        <div className="absolute right-[5%] top-[20%] bottom-[20%] w-[1px] bg-white/5 flex flex-col justify-between items-center">
          <span className="font-mono text-[10px] text-text-muted">01</span>
          <span className="font-mono text-[10px] text-text-muted">02</span>
          <span className="font-mono text-[10px] text-text-muted">03</span>
        </div>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
        <div className="grid lg:grid-cols-[40%_60%] gap-12 lg:gap-8 items-center">
          {/* Text content */}
          <div className="relative z-10 order-2 lg:order-1">
            <span
              ref={labelRef}
              className="inline-block font-mono text-xs uppercase tracking-[2px] text-[#473090] mb-6 opacity-0"
            >
              Technologies that work for RESULTS
            </span>

            <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] tracking-[-2px] mb-6">
              <div ref={titleLine1Ref} className="text-white opacity-0">
                CREATE
              </div>
              <div ref={titleLine2Ref} className="opacity-0">
                <span className="text-[#FF6B35]" style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '0.5em', lineHeight: '1.8' }}>DIGITALLY</span>
                <br />
                <span className="text-white">FUTURE</span>
              </div>
            </h1>

            <p
              ref={subtitleRef}
              className="font-inter text-lg text-text-secondary max-w-[500px] mb-10 opacity-0"
            >
              Our developments create quality and reliability, not problems and chaos. Our solutions change the rules of the game!
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("#services")}
                className="group font-inter text-sm font-semibold uppercase tracking-wider text-[#FF6B35] px-8 py-4 border border-[#FF6B35] hover:bg-[#FF6B35]/10 transition-all duration-300 flex items-center gap-2"
              >
                more 
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToSection("#contact")}
                className="font-inter text-sm font-semibold uppercase tracking-wider text-[#FF6B35] px-8 py-4 border border-[#FF6B35] hover:bg-[#FF6B35]/10 transition-all duration-300"
              >
                contact us
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div ref={imageRef} className="relative order-1 lg:order-2 opacity-0">
            <div className="relative aspect-[16/9] max-w-[800px] mx-auto lg:ml-0">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/20 via-neon-pink/20 to-neon-purple/20 blur-3xl" />
              
              <img
                src="/hero-image.png"
                alt="Cyberpunk digital face"
                className="relative w-full h-full object-cover"
                style={{
                  boxShadow: "0 0 40px rgba(255,107,53,0.15), 0 0 80px rgba(155,77,255,0.1)",
                }}
              />

              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-neon-orange/50" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-neon-pink/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
