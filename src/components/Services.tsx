import { ImageWithFallback } from './supporting_compoments/ImageWithFallback';
import { Heart, Cake, Building2, Flower2, Palette } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Heart,
      title: 'Wedding Decoration',
      description:
        'Exquisite designs for your dream wedding with traditional and contemporary elements',
      image:
        '/Wedding_decoration.jpg',
    },
    {
      icon: Cake,
      title: 'Birthday & Engagement Decor',
      description:
        'Creative and vibrant decorations for birthdays and engagement celebrations',
      image:
        '/Cake.jpg',
    },
    {
      icon: Building2,
      title: 'Reception & Stage Decoration',
      description:
        'Stunning stage setups and reception arrangements that make a grand impression',
      image:
        '/Reception.jpeg',
    },
    {
      icon: Building2,
      title: 'Pakkoda & Shamiyana Setup',
      description:
        'Professional and elegant Pakkoda, Chair, Carpet, and Shamiyana setups for all events',
      image:
        '/Pakoda_and_Shamiyana.jpeg',
    },
    {
      icon: Flower2,
      title: 'Flower & Theme Decoration',
      description:
        'Beautiful floral arrangements and custom themed decorations tailored to your vision',
      image:
        '/Flower_and_theme.jpg',
    },
    {
      icon: Palette,
      title: 'Custom Event Design',
      description:
        'Bespoke decoration solutions crafted to match your unique style and preferences',
      image:
        '/Custom_design.jpeg',
    },
  ];

  return (
    <section
      id="services"
      className="py-24 px-3 md:px-6 bg-[#faf9f6]"
    >
      {/* Wider container than max-w-7xl */}
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl mb-4 text-[#1a1a2e]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Services
          </h2>
          <div className="w-28 h-1 bg-[#d4af37] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive decoration services for every type of celebration
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-[280px] overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 to-transparent"></div>

                {/* Icon */}
                <div className="absolute top-5 right-5 w-14 h-14 bg-[#d4af37] rounded-full flex items-center justify-center shadow-lg">
                  <service.icon className="w-7 h-7 text-[#1a1a2e]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3
                  className="text-xl mb-3 text-[#1a1a2e]"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
