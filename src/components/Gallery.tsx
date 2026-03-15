import { useState, useEffect } from 'react';
import { X, Loader, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface GalleryItem {
  _id: string;
  title: string;
  cloudinaryUrl: string;
  eventCategory: string;
  mediaType: 'image' | 'video';
}

interface CategoryData {
  category: string;
  categoryLabel: string;
  featuredImage: string | null;
  imageCount: number;
}

// Helper function to get video thumbnail URL from Cloudinary
const getVideoThumbnailUrl = (videoUrl: string): string => {
  if (!videoUrl.includes('cloudinary')) return videoUrl;
  
  // Convert video URL to thumbnail URL using Cloudinary transformations
  // Replace the video file extension with .jpg and add thumbnail transformations
  const thumbUrl = videoUrl.replace(
    /\/upload\//,
    '/upload/c_scale,w_300,h_200,ar_16:9,g_center/'
  ).replace(/\.(mp4|webm)$/i, '.jpg');
  
  return thumbUrl;
};

export default function Gallery() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryImages, setCategoryImages] = useState<GalleryItem[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Fetch images when category is selected
  useEffect(() => {
    if (selectedCategory) {
      loadCategoryImages(selectedCategory);
    }
  }, [selectedCategory]);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/gallery/categories`
      );
      const data = await response.json();
      
      // Convert video featured images to thumbnails
      const processedCategories = data.categories?.map((cat: CategoryData) => ({
        ...cat,
        featuredImage: cat.featuredImage && /\.(mp4|webm)$/i.test(cat.featuredImage)
          ? getVideoThumbnailUrl(cat.featuredImage)
          : cat.featuredImage
      })) || [];
      
      setCategories(processedCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategoryImages = async (category: string) => {
    setIsLoadingImages(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/gallery/category/${category}`
      );
      const data = await response.json();
      setCategoryImages(data.galleries || []);
      setCurrentImageIndex(0);
    } catch (error) {
      console.error('Error loading category images:', error);
      setCategoryImages([]);
    } finally {
      setIsLoadingImages(false);
    }
  };

  const handleNextImage = () => {
    if (categoryImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % categoryImages.length);
    }
  };

  const handlePreviousImage = () => {
    if (categoryImages.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + categoryImages.length) % categoryImages.length
      );
    }
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setCategoryImages([]);
    setCurrentImageIndex(0);
  };

  return (
    <section id="gallery" className="py-24 px-3 md:px-6 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl mb-4 text-[#1a1a2e]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Portfolio
          </h2>
          <div className="w-28 h-1 bg-[#d4af37] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our stunning collection of past events organized by category
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="animate-spin text-[#d4af37]" size={40} />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No gallery images available yet. Come back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
                  className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                >
                  {/* Featured Image */}
                  {category.featuredImage ? (
                    <>
                      <img
                        src={category.featuredImage}
                        alt={category.categoryLabel}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Video Indicator for Category Cards */}
                      {/\.(mp4|webm)$/i.test(category.featuredImage) && (
                        <div className="absolute top-3 left-3 bg-black/60 p-2 rounded-full">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-transparent to-transparent flex flex-col items-end justify-end p-6 group-hover:from-[#1a1a2e] transition-all duration-300">
                    <h3
                      className="text-white text-2xl font-semibold"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {category.categoryLabel}
                    </h3>
                    <p className="text-[#d4af37] text-sm mt-2">
                      {category.imageCount} item{category.imageCount !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Click Indicator */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Gallery
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Gallery Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Loading State */}
          {isLoadingImages ? (
            <div className="flex items-center justify-center">
              <Loader className="animate-spin text-[#d4af37]" size={40} />
            </div>
          ) : categoryImages.length === 0 ? (
            <div className="text-center">
              <p className="text-white text-lg">
                No images found in this category
              </p>
            </div>
          ) : (
            <div className="w-full max-w-4xl">
              {/* Main Image/Video Display */}
              <div className="relative mb-6 rounded-lg overflow-hidden bg-black">
                {categoryImages[currentImageIndex].mediaType === 'video' ? (
                  <video
                    src={categoryImages[currentImageIndex].cloudinaryUrl}
                    controls
                    className="w-full max-h-96 object-contain"
                  />
                ) : (
                  <img
                    src={categoryImages[currentImageIndex].cloudinaryUrl}
                    alt={categoryImages[currentImageIndex].title}
                    className="w-full max-h-96 object-contain rounded-lg"
                  />
                )}

                {/* Navigation Buttons */}
                {categoryImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {categoryImages.length}
                </div>
              </div>

              {/* Image Title and Thumbnail Grid */}
              <div className="text-center mb-6">
                <h3 className="text-white text-2xl font-semibold mb-2">
                  {categoryImages[currentImageIndex].title}
                </h3>
                <p className="text-[#d4af37]">
                  {selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)}
                </p>
              </div>

              {/* Thumbnail Grid */}
              {categoryImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {categoryImages.map((media, index) => (
                    <button
                      key={media._id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'ring-2 ring-[#d4af37] scale-110'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={media.mediaType === 'video' ? getVideoThumbnailUrl(media.cloudinaryUrl) : media.cloudinaryUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full aspect-square object-cover"
                      />
                      {/* Video Indicator */}
                      {media.mediaType === 'video' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
