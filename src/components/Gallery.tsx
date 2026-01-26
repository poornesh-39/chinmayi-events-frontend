import { useState } from 'react';
import { X } from 'lucide-react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageWithFallback } from './supporting_compoments/ImageWithFallback';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const galleryImages = [
    {
      url: '/Gallery15.jpeg',
      category: 'Stage Decoration',
    },
    {
      url: '/Gallery14.jpeg',
      category: 'Naming Ceremony Celebration',
    },
    {
      url: '/Gallery9.jpeg',
      category: 'Stage Decoration',
    },
    {
      url: '/Gallery3.jpeg',
      category: 'Birthday Decoration',
    },
    {
      url: '/Gallery5.jpeg',
      category: 'Custom design stage',
    },
    {
      url: '/Gallery6.jpeg',
      category: 'House Warming Decoration',
    },
    {
      url: '/Gallery7.jpeg',
      category: 'Reception Decoration with lights',
    },
    {
      url: '/Gallery2.jpeg',
      category: 'Reception Stage Decoration',
    },
    {
      url: '/Gallery4.jpeg',
      category: 'Birthday Decoration',
    },
    {
      url: '/Gallery10.jpeg',
      category: 'Baby Shower Decoration',
    },
    {
      url: '/Gallery11.jpeg',
      category: 'Floral Decoration',
    },
    {
      url: '/Gallery18.jpeg',
      category: 'Haldi Decoration',
    },
    {
      url: '/Gallery13.jpeg',
      category: 'Pakkoda and Chair Setup',
    },
    {
      url: '/Gallery8.jpeg',
      category: 'Custom Stage Design',
    },
    {
      url: '/Gallery1.jpeg',
      category: 'Pakkoda and Chair Setup',
    },
    {
      url: '/Gallery12.jpeg',
      category: 'Centerpiece Design',
    },
    {
      url: '/Gallery17.jpeg',
      category: 'Haldi Decoration',
    },
    {
      url: '/Gallery16.jpeg',
      category: 'Reception Decoration',
    },
  ];

  const displayedImages = showMore
    ? galleryImages
    : galleryImages.slice(0, 6);

  return (
    <section
      id="gallery"
      className="py-24 px-3 md:px-6 bg-white"
    >
      {/* Wider container */}
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
            Explore our stunning collection of past events and celebrations
          </p>
        </div>

        {/* Masonry Gallery */}
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            350: 1,
            640: 2,
            1024: 3,
          }}
        >
          <Masonry gutter="1.25rem">
            {displayedImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(image.url)}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.category}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span
                    className="text-white text-lg"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {image.category}
                  </span>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>

        {/* Load More */}
        {!showMore && galleryImages.length > 6 && (
          <div className="text-center mt-14">
            <button
              onClick={() => setShowMore(true)}
              className="px-8 py-3 bg-[#d4af37] text-[#1a1a2e] hover:bg-[#c19a2e] transition-colors duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
