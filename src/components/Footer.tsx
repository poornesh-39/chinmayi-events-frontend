import { Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

interface FooterProps {
  onAdminClick?: () => void
}

export default function Footer({ onAdminClick }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3
              className="text-2xl text-[#d4af37]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Chinmayi Events
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Creating magical moments and unforgettable memories through
              exceptional event decoration services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="text-lg text-[#d4af37]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-[#d4af37] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4
              className="text-lg text-[#d4af37]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Services
            </h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Wedding Decoration</li>
              <li>Birthday Party & Celebrations</li>
              <li>Corporate Events</li>
              <li>Reception & Stage Setup</li>
              <li>Pakkoda, Chair, Carpet & Shamiyana Setup</li>
              <li>Floral Arrangements</li>
              <li>Custom Event Design</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4
              className="text-lg text-[#d4af37]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Contact Us
            </h4>

            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-10 h-10 text-[#d4af37] mt-1" />
                <span>
                  Chandrakatte, Behind ShanimahathmaTemple, Kempanahalli, Chikkamagaluru-577101
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#d4af37]" />
                <a
                  href="tel:+919380350678"
                  className="hover:text-[#d4af37] transition-colors"
                >
                  +91 93803 50678
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#d4af37]" />
                <a
                  href="mailto:chinmayievents99@gmail.com"
                  className="hover:text-[#d4af37] transition-colors"
                >
                  chinmayievents99@gmail.com
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://instagram.com/chinmayi_decorators/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#d4af37]/20 hover:bg-[#d4af37] rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/919380350678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#d4af37]/20 hover:bg-[#d4af37] rounded-full flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {/* <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487z" />
                </svg> */}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Chinmayi Events. All rights reserved.
          </p>

          {onAdminClick && (
            <button
              onClick={onAdminClick}
              className="text-gray-400 hover:text-[#d4af37] text-sm transition-colors"
            >
              Admin Login
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}
