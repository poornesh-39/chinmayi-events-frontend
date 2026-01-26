const BASE_URL = import.meta.env.VITE_API_URL;

// Contact Us
export const submitContactForm = async (data: {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  message: string;
}) => {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Contact form failed");
  }

  return res.json();
};

// Share Experience
export const submitExperience = async (data: {
  name: string;
  experience: string;
  rating: number;
}) => {
  const res = await fetch(`${BASE_URL}/api/experience`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Experience submission failed");
  }

  return res.json();
};

// Get Testimonials
export const fetchExperiences = async () => {
  const res = await fetch(`${BASE_URL}/api/experience`);
  if (!res.ok) throw new Error("Failed to load testimonials");
  return res.json();
};
