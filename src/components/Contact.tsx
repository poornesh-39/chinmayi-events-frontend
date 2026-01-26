import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { submitContactForm } from '../services/api';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    message: ''
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await submitContactForm(formData);
      alert('Thank you for your inquiry! We will get back to you soon.')
      setFormData({
      name: '',
      phone: '',
      email: '',
      eventType: '',
      message: ''
    });
    } catch {
      alert('There was an error submitting the form. Please try again later.')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappNumber = '919380350678' // change to real number
  const whatsappMessage =
    'Hi, I would like to inquire about event decoration services.'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl mb-4 text-[#1a1a2e]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Get In Touch
          </h2>

          <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-6"></div>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Let&apos;s discuss your event and create something extraordinary
            together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3
                className="text-2xl mb-6 text-[#1a1a2e]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex gap-4 p-4 bg-[#faf9f6] rounded-lg">
                  <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <a
                      href="tel:+919380350678"
                      className="text-[#1a1a2e] hover:text-[#d4af37] transition-colors"
                    >
                      +91 93803 50678, +91 97311 78038
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 p-4 bg-[#faf9f6] rounded-lg">
                  <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <a
                      href="mailto:chinmayievents99@gmail.com"
                      className="text-[#1a1a2e] hover:text-[#d4af37] transition-colors"
                    >
                      chinmayievents99@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4 p-4 bg-[#faf9f6] rounded-lg">
                  <div className="w-12 h-12 bg-[#d4af37]/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="text-[#1a1a2e]">
                      Chandrakatte, Behind ShanimahathmaTemple, Kempanahalli, Chikkamagaluru-577101
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#25D366]/10 border-2 border-[#25D366] rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
                <h4
                  className="text-xl text-[#1a1a2e]"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Quick Contact
                </h4>
              </div>

              <p className="text-gray-600 mb-4">
                Get instant response via WhatsApp for urgent inquiries
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white hover:bg-[#20BA5A] transition-colors rounded-lg shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#faf9f6] rounded-xl p-8 shadow-lg">
            <h3
              className="text-2xl mb-6 text-[#1a1a2e]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none"
              />

              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none"
              >
                <option value="">Select Event Type</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="engagement">Engagement</option>
                <option value="reception">Reception</option>
                <option value="housewarming">Housewarming</option>
                <option value="corporate">Corporate Event</option>
                <option value="other">Other</option>
              </select>


              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your event..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#d4af37] outline-none resize-none"
              />

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#d4af37] text-[#1a1a2e] hover:bg-[#c19a2e] transition-colors rounded-lg shadow-lg flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
