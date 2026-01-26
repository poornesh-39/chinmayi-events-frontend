import { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Trash2,
  Check,
  X
} from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] =
    useState<'gallery' | 'messages' | 'testimonials'>('gallery');

  /* ------------------ MOCK DATA ------------------ */

  const [messages] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      eventType: 'Wedding',
      message: 'Looking for wedding decoration services',
      date: '2025-01-02'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 9876543211',
      eventType: 'Birthday',
      message: 'Need decoration for birthday party',
      date: '2025-01-01'
    }
  ]);

  const [testimonials] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      event: 'Wedding',
      rating: 5,
      feedback: 'Amazing service!',
      approved: true
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      event: 'Reception',
      rating: 5,
      feedback: 'Highly professional team',
      approved: false
    }
  ]);

  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  /* ------------------ LOGIN ------------------ */

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      email === 'admin@chinmayievents.com' &&
      password === 'admin123'
    ) {
      setIsLoggedIn(true);
    } else {
      alert(
        'Invalid credentials\nadmin@chinmayievents.com / admin123'
      );
    }
  };

  /* ------------------ IMAGE UPLOAD ------------------ */

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const images = Array.from(e.target.files).map(file =>
      URL.createObjectURL(file)
    );

    setGalleryImages(prev => [...prev, ...images]);
  };

  /* ------------------ LOGIN SCREEN ------------------ */

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#d4af37] mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Website
          </button>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2
              className="text-3xl text-center text-[#1a1a2e] mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Admin Login
            </h2>

            <p className="text-center text-gray-600 mb-8">
              Access your dashboard
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-lg"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="w-full py-4 bg-[#d4af37] rounded-lg font-semibold"
              >
                Login
              </button>
            </form>

            {/* <p className="text-xs text-center text-gray-500 mt-6">
              Demo: admin@chinmayievents.com / admin123
            </p> */}
          </div>
        </div>
      </div>
    );
  }

  /* ------------------ DASHBOARD ------------------ */

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <div className="bg-[#1a1a2e] text-white px-6 py-5 flex justify-between items-center">
        <div>
          <h1
            className="text-2xl"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-300">
            Chinmayi Events
          </p>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-[#d4af37] px-4 py-2 rounded-lg text-black"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow">
        <div className="flex gap-6 px-6">
          {(['gallery', 'messages', 'testimonials'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 capitalize border-b-2 ${
                activeTab === tab
                  ? 'border-[#d4af37] text-[#d4af37]'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Gallery */}
        {activeTab === 'gallery' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {galleryImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    className="h-32 w-full object-cover rounded"
                  />
                  <button
                    onClick={() =>
                      setGalleryImages(prev =>
                        prev.filter((_, idx) => idx !== i)
                      )
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h3 className="font-semibold">{msg.name}</h3>
                <p className="text-sm text-gray-500">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Testimonials */}
        {activeTab === 'testimonials' && (
          <div className="space-y-4">
            {testimonials.map(t => (
              <div
                key={t.id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <div className="flex justify-between">
                  <div>
                    <h3>{t.name}</h3>
                    <p className="text-sm">{t.event}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#d4af37]"
                      />
                    ))}
                  </div>
                </div>

                <p className="italic text-gray-600 mt-2">
                  "{t.feedback}"
                </p>

                {!t.approved && (
                  <div className="flex gap-2 mt-3">
                    <button className="bg-green-500 text-white px-3 py-1 rounded">
                      <Check size={14} />
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
