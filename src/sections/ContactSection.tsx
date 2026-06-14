import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GradientText } from "@/components/custom/GradientText";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const titleRef = useScrollAnimation<HTMLDivElement>({
    animation: "fadeInLeft",
  });
  const formRef = useScrollAnimation<HTMLDivElement>({
    animation: "fadeInRight",
    delay: 0.2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you! We will contact you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={titleRef}
      id="contact"
      className="relative py-24 lg:py-32 bg-dark-bg"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-orange/30 to-transparent" />

      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/contacts_image.png')] bg-cover bg-center" />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Title */}
          <div>
            <h2 className="font-montserrat font-extrabold text-4xl sm:text-5xl lg:text-[48px] tracking-[-2px] leading-[1.15]">
              <span className="block text-white">READY</span>
              <span className="block text-white">TO CREATE</span>
              <span className="block">
                <GradientText variant="orange-pink">SOMETHING BIG</GradientText>
              </span>
              <span className="block text-white">TOGETHER?</span>
            </h2>
          </div>

          {/* Right: Form */}
          <div ref={formRef} className="relative">
            <form onSubmit={handleSubmit} className="relative space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
  className="w-full bg-[#0A0A0F] border border-[#383758] px-4 py-3.5 font-inter text-base text-white placeholder:text-text-muted focus:outline-none transition-all duration-300 [&::-webkit-autofill]:bg-[#0A0A0F] [&::-webkit-autofill]:text-white [&:-webkit-autofill]:hover:bg-[#0A0A0F] [&:-webkit-autofill]:focus:bg-[#0A0A0F]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
  className="w-full bg-[#0A0A0F] border border-[#383758] px-4 py-3.5 font-inter text-base text-white placeholder:text-text-muted focus:outline-none transition-all duration-300 [&::-webkit-autofill]:bg-[#0A0A0F] [&::-webkit-autofill]:text-white [&:-webkit-autofill]:hover:bg-[#0A0A0F] [&:-webkit-autofill]:focus:bg-[#0A0A0F]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
  className="w-full bg-[#0A0A0F] border border-[#383758] px-4 py-3.5 font-inter text-base text-white placeholder:text-text-muted focus:outline-none transition-all duration-300 [&::-webkit-autofill]:bg-[#0A0A0F] [&::-webkit-autofill]:text-white [&:-webkit-autofill]:hover:bg-[#0A0A0F] [&:-webkit-autofill]:focus:bg-[#0A0A0F]"
                  />
                </div>
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-[#0A0A0F] border border-[#383758] rounded-lg px-4 py-3.5 font-inter text-base text-white placeholder:text-text-muted focus:outline-none transition-all duration-300 resize-none [&::-webkit-autofill]:bg-[#0A0A0F] [&::-webkit-autofill]:text-white [&:-webkit-autofill]:hover:bg-[#0A0A0F] [&:-webkit-autofill]:focus:bg-[#0A0A0F]"
                />
              </div>
              <button
                type="submit"
                className="w-auto font-inter text-sm font-semibold uppercase tracking-wider text-[#FF6B35] px-6 py-3.5 border border-[#FF6B35] hover:bg-[#FF6B35]/10 transition-all duration-300"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
