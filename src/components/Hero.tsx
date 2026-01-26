import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Wedding_decoration.jpg"
          alt="Luxury Wedding Decoration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/70 to-dark/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36 text-center text-ivory">
        
        {/* Logo / Brand */}
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-serif text-gold">
          Chinmayi Events
        </h1>

        {/* Tagline */}
        <p className="mt-8 my-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif tracking-wide text-ivory90">
          Creating Magical Moments
        </p>

        {/* Description */}
        <p className="max-w-2xl mx-auto mb-12 text-lg sm:text-xl md:text-2xl text-ivory90 font-serif leading-relaxed">
          Transform your special occasions into unforgettable memories with our
          premium event decoration services
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-2 px-8 py-4 rounded-lg bg-gold text-dark font-semibold shadow-lg hover:shadow-xl hover:bg-[#c19a2e] transition-all"
          >
            Book Your Event
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() =>
              document
                .getElementById("gallery")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 rounded-lg border-2 border-gold text-gold font-semibold shadow-lg hover:bg-gold hover:text-dark transition-all"
          >
            View Gallery
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold rounded-full mx-auto flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gold rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
