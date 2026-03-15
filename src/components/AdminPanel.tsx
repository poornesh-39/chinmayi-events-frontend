import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Trash2,
  Upload,
  Loader,
  Play,
  Image as ImageIcon,
  Video
} from 'lucide-react';
import QuotationForm from './QuotationForm';

interface AdminPanelProps {
  onBack: () => void;
}

// Helper function to get video thumbnail URL from Cloudinary
const getVideoThumbnailUrl = (videoUrl: string): string => {
  if (!videoUrl.includes('cloudinary')) return videoUrl;
  
  // Convert video URL to thumbnail URL using Cloudinary transformations
  const thumbUrl = videoUrl.replace(
    /\/upload\//,
    '/upload/c_scale,w_300,h_200,ar_16:9,g_center/'
  ).replace(/\.(mp4|webm)$/i, '.jpg');
  
  return thumbUrl;
};

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] =
    useState<'gallery' | 'quotations'>('gallery');

  // Gallery upload states
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [galleryList, setGalleryList] = useState<any[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);

  /* ------------------ LOGIN SCREEN ------------------ */

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

  useEffect(() => {
    if (isLoggedIn && activeTab === 'gallery') {
      loadGalleryImages();
    }
  }, [isLoggedIn, activeTab]);

  const loadGalleryImages = async () => {
    setIsLoadingGallery(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/gallery/admin/all`
      );
      const data = await response.json();
      setGalleryList(data.galleries || []);
    } catch (error) {
      console.error('Error loading gallery:', error);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  // Extract video thumbnail from first frame
  const extractVideoThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        video.currentTime = 1; // 1 second into video
      };

      video.onseeked = () => {
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          resolve(canvas.toDataURL('image/jpeg'));
        }
      };

      video.onerror = () => {
        reject(new Error('Failed to load video'));
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      const fileTypeDetected = file.type.startsWith('video/') ? 'video' : 'image';
      setFileType(fileTypeDetected);

      if (fileTypeDetected === 'video') {
        // Extract thumbnail from video for preview
        extractVideoThumbnail(file).then(thumbnail => {
          setUploadPreview(thumbnail);
        }).catch(error => {
          console.error('Failed to extract thumbnail:', error);
          // Fallback: show video metadata
          const objectUrl = URL.createObjectURL(file);
          setUploadPreview(objectUrl);
        });
      } else {
        // For images, use normal file reading
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadFile || !uploadTitle || !uploadCategory) {
      alert('Please fill in all required fields');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('title', uploadTitle);
    formData.append('description', uploadDescription);
    formData.append('eventCategory', uploadCategory);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/gallery/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      alert('Media uploaded successfully!');
      // Reset form
      setUploadTitle('');
      setUploadDescription('');
      setUploadCategory('');
      setUploadFile(null);
      setUploadPreview('');
      setFileType(null);
      loadGalleryImages();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload media. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/gallery/${imageId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      alert('Media deleted successfully!');
      loadGalleryImages();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete media. Please try again.');
    }
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
          {(['gallery', 'quotations'] as const).map(tab => (
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
          <div className="space-y-8">
            {/* Upload Section */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#d4af37]/10 rounded-lg">
                  <Upload className="w-6 h-6 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a2e]">
                  Upload Media to Gallery
                </h3>
              </div>

              <form onSubmit={handleUploadImage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Media Title *
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={e => setUploadTitle(e.target.value)}
                    placeholder="e.g., Bride's Entry, Decoration Close-up"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={uploadDescription}
                    onChange={e => setUploadDescription(e.target.value)}
                    placeholder="Add details about this media..."
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Category *
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={e => setUploadCategory(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  >
                    <option value="">Select Category</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="engagement">Engagement</option>
                    <option value="reception">Reception</option>
                    <option value="haldi(pre-wedding)">Haldi (Pre-Wedding)</option>
                    <option value="naming-ceremony">Naming Ceremony</option>
                    <option value="housewarming">Housewarming</option>
                    <option value="corporate">Corporate</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image or Video File *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileSelect}
                      className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#d4af37] file:text-black hover:file:bg-yellow-500 file:transition file:cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported: JPG, PNG, WebP, GIF, MP4, WebM (Max 50MB)
                  </p>
                </div>

                {uploadPreview && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      {fileType === 'video' ? (
                        <>
                          <Video className="w-5 h-5 text-[#d4af37]" />
                          <span className="text-sm font-medium text-gray-700">Video Thumbnail</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-5 h-5 text-[#d4af37]" />
                          <span className="text-sm font-medium text-gray-700">Image Preview</span>
                        </>
                      )}
                    </div>
                    <div className="relative">
                      <img
                        src={uploadPreview}
                        alt="Preview"
                        className="max-h-64 rounded-lg w-full object-cover"
                      />
                      {fileType === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <Play className="w-16 h-16 text-white/50 fill-white/50" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-[#d4af37] transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Upload size={18} />
                  {isUploading ? 'Uploading...' : 'Upload Media'}
                </button>
              </form>
            </div>

            {/* Gallery List */}
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#d4af37]/10 rounded-lg">
                  <ImageIcon className="w-6 h-6 text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a2e]">
                  Media Library ({galleryList.length})
                </h3>
              </div>

              {isLoadingGallery ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="animate-spin text-[#d4af37]" size={32} />
                </div>
              ) : galleryList.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No media uploaded yet. Start by uploading your first image or video!
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryList.map(media => (
                    <div
                      key={media._id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                    >
                      <div className="relative group">
                        <img
                          src={media.mediaType === 'video' ? getVideoThumbnailUrl(media.cloudinaryUrl) : media.cloudinaryUrl}
                          alt={media.title}
                          className="w-full h-40 object-cover group-hover:brightness-75 transition"
                        />
                        {/* Media Type Badge */}
                        <div className="absolute top-2 right-2 bg-black/60 px-3 py-1 rounded-full flex items-center gap-1 text-white text-xs font-semibold">
                          {media.mediaType === 'video' ? (
                            <>
                              <Video className="w-3 h-3" />
                              <span>Video</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-3 h-3" />
                              <span>Image</span>
                            </>
                          )}
                        </div>
                        {/* Video Play Indicator */}
                        {media.mediaType === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <Play className="w-12 h-12 text-white fill-white drop-shadow-lg" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-[#1a1a2e] mb-2 line-clamp-1">
                          {media.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Category:</span>{' '}
                          <span className="capitalize text-[#d4af37]">
                            {media.eventCategory}
                          </span>
                        </p>
                        {media.description && (
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                            {media.description}
                          </p>
                        )}
                        <button
                          onClick={() => handleDeleteImage(media._id)}
                          className="w-full py-2 bg-red-500/10 text-red-600 font-medium rounded-lg hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}



        {/* Quotations */}
        {activeTab === 'quotations' && (
          <QuotationForm />
        )}
      </div>
    </div>
  );
}
