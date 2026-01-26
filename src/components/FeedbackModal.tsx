import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Star, Check } from 'lucide-react'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    eventType: '',
    rating: 0,
    message: '',
    allowDisplay: false
  })

  const [hoveredStar, setHoveredStar] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.rating === 0) {
      alert('Please select a rating')
      return
    }

    try {
      setIsSubmitting(true)

      // ✅ BACKEND-COMPATIBLE PAYLOAD
      const payload = {
        fullName: formData.fullName,
        eventType: formData.eventType,
        rating: formData.rating,
        experience: formData.message
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/experience`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')

      setIsSubmitted(true)

      // Auto close after success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          fullName: '',
          eventType: '',
          rating: 0,
          message: '',
          allowDisplay: false
        })
        onClose()
      }, 5000)
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong'
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* CLOSE */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="p-8 md:p-12">
                {!isSubmitted ? (
                  <>
                    {/* HEADER */}
                    <div className="text-center mb-8">
                      <h2
                        className="text-[#1a1a2e] mb-3"
                        style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                          fontWeight: 700
                        }}
                      >
                        Share Your Experience
                      </h2>

                      <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-4" />

                      <p className="text-gray-600 font-poppins">
                        Your feedback helps us serve you better
                      </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <input
                        required
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border-2 rounded-xl focus:border-[#D4AF37]"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />

                      <select
                        required
                        className="w-full px-4 py-3 border-2 rounded-xl focus:border-[#D4AF37]"
                        value={formData.eventType}
                        onChange={(e) =>
                          setFormData({ ...formData, eventType: e.target.value })
                        }
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

                      {/* STARS */}
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            onClick={() =>
                              setFormData({ ...formData, rating: star })
                            }
                          >
                            <Star
                              className={`w-10 h-10 ${
                                star <= (hoveredStar || formData.rating)
                                  ? 'fill-[#D4AF37] text-[#D4AF37]'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>

                      <textarea
                        required
                        rows={4}
                        placeholder="Share your experience..."
                        className="w-full px-4 py-3 border-2 rounded-xl focus:border-[#D4AF37]"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />

                      {/* <label className="flex gap-3 text-gray-600 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.allowDisplay}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              allowDisplay: e.target.checked
                            })
                          }
                        />
                        Allow us to display this testimonial publicly
                      </label> */}

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-[#1a1a2e] rounded-xl font-semibold shadow-lg"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                      </motion.button>
                    </form>
                  </>
                ) : (
                  /* SUCCESS */
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8941E] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-white" />
                    </div>

                    <h3
                      className="text-2xl text-[#1a1a2e] mb-2"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Thank You!
                    </h3>

                    <p className="text-gray-600">
                      Your feedback has been submitted successfully.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
