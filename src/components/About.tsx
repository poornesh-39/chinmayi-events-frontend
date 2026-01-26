import { Sparkles, Heart, Award } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="mb-4 font-serif text-dark
            text-4xl sm:text-5xl md:text-6xl">
            About Chinmayi Events
          </h2>

          <div className="w-24 h-1 bg-gold mx-auto mb-6" />

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
            Your trusted partner in creating extraordinary celebrations that
            leave lasting impressions
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-14 items-center mb-20">

          {/* Story */}
          <div className="space-y-6">
            <h3 className="font-serif text-dark
              text-2xl sm:text-3xl md:text-4xl">
              Our Story
            </h3>

            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              At Chinmayi Events, we believe that every celebration deserves to be
              extraordinary. With years of experience in event decoration, we've
              transformed countless venues into magical spaces that perfectly
              capture the essence of your special moments.
            </p>

            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
              From intimate gatherings to grand celebrations, our team brings
              creativity, professionalism, and attention to detail to every
              project. We blend traditional Indian aesthetics with contemporary
              design trends to create unique atmospheres that reflect your
              personal style and vision.
            </p>
          </div>

          {/* Image */}
          <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/About_center_piece.avif"
              alt="Wedding Centerpiece"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-8">

          {/* Feature Card */}
          <div className="text-center p-8 bg-soft rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-gold" />
            </div>
            <h4 className="mb-3 font-serif text-dark text-xl">
              Creative Excellence
            </h4>
            <p className="text-gray-600">
              Innovative designs that bring your vision to life with artistic flair
            </p>
          </div>

          <div className="text-center p-8 bg-soft rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gold" />
            </div>
            <h4 className="mb-3 font-serif text-dark text-xl">
              Personalized Service
            </h4>
            <p className="text-gray-600">
              Every event is unique, and we tailor our services to your specific needs
            </p>
          </div>

          <div className="text-center p-8 bg-soft rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-gold" />
            </div>
            <h4 className="mb-3 font-serif text-dark text-xl">
              Professional Quality
            </h4>
            <p className="text-gray-600">
              Premium materials and flawless execution for memorable celebrations
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
