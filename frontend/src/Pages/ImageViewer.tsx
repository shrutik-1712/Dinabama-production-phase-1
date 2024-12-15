import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  imageTitle: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  imageTitle
}) => {
  const startX = useRef<number | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  if (!images || images.length === 0) return null;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrevious();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startX.current) return;

    const currentX = e.touches[0].clientX;
    const diffX = startX.current - currentX;

    // Determine swipe threshold (e.g., 50 pixels)
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped left, go to next image
        onNext();
      } else {
        // Swiped right, go to previous image
        onPrevious();
      }
      startX.current = null;
    }
  };

  const handleTouchEnd = () => {
    startX.current = null;
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = '/api/placeholder/800/600';
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center touch-none select-none"
      role="dialog"
      aria-label={`Image viewer - ${imageTitle}`}
    >
      <div 
        ref={imageContainerRef}
        className="absolute inset-0 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`${imageTitle} - ${currentIndex + 1} of ${images.length}`}
          className="max-h-[90vh] max-w-[90vw] object-contain"
          onError={handleImageError}
          draggable={false}
        />
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2 rounded-full hover:bg-white/10 transition-colors active:bg-white/20"
        aria-label="Close viewer"
      >
        <X className="h-8 w-8" />
      </button>
      {images.length > 1 && (
        <>
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-2 rounded-full hover:bg-white/10 transition-colors active:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
         
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-2 rounded-full hover:bg-white/10 transition-colors active:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageViewer;