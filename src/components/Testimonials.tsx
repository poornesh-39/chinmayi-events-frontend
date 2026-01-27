import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FeedbackModal from './FeedbackModal'
import { fetchExperiences } from '../services/api'

interface Testimonial {
  _id: string;
  fullName: string;
  experience: string;
  rating: number;
  eventType: string;
}

export default function Testimonials() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [sliderReady, setSliderReady] = useState(false)

  /* ---------------- FETCH FROM DB ---------------- */
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchExperiences();
        setTestimonials(data);

        setTimeout(() => {
          setSliderReady(true)
        }, 100)
      } catch (error) {
        console.error('Failed to load testimonials', error)
      }
    }

    loadTestimonials()
  }, [])

  const settings = {
  dots: true,
  infinite: testimonials.length > 3,
  speed: 300,
  slidesToShow: 1, // mobile-first
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  arrows: false,
  adaptiveHeight: true,
  centerMode: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        arrows: true
      }
    }
  ]
}



return (
    <>
      <section id="testimonials" className="py-20 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl mb-4 text-[#1a1a2e]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Client Testimonials
            </h2>

            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-6"></div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What our happy clients say about their experience with us
            </p>
          </div>

          {/* Slider */}
          <div className="testimonials-slider">
            {sliderReady &&(
            <Slider key={testimonials.length} {...settings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="px-3 h-full">
                  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-6">
                      <Quote className="w-6 h-6 text-[#d4af37]" />
                    </div>

                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-[#d4af37] text-[#d4af37]"
                        />
                      ))}
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed italic flex-grow">
                      “{testimonial.experience}”
                    </p>

                    <div className="border-t border-gray-200 pt-4">
                      <p
                        className="text-[#1a1a2e] mb-1"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {testimonial.fullName}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {testimonial.eventType}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
)}
          </div>

          {/* CTA Button */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-[#1a1a2e] mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                fontWeight: 700
              }}
            >
              Loved Our Service?
            </h3>

            <p
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Share your experience with us and help others discover the magic we create
            </p>

            <motion.button
              onClick={() => setIsFeedbackModalOpen(true)}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 60px rgba(212, 175, 55, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-[#1a1a2e] rounded-xl shadow-2xl"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.125rem',
                fontWeight: 600
              }}
            >
              Share Your Experience
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </>
  )
}
