import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import Picture1 from "../assets/LibraryCarouselImages/Picture1.jpg"
import Picture2 from "../assets/LibraryCarouselImages/Picture2.jpg"
import Picture3 from "../assets/LibraryCarouselImages/Picture3.jpg"
import Picture4 from "../assets/LibraryCarouselImages/Picture4.jpg"
import Picture5 from "../assets/LibraryCarouselImages/Picture5.jpg"
import Picture6 from "../assets/LibraryCarouselImages/Picture6.jpg"

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroImages = [
    { url: Picture1, alt: "Library Image 1" },
    { url: Picture2, alt: "Library Image 2" },
    { url: Picture3, alt: "Library Image 3" },
    { url: Picture4, alt: "Library Image 4" },
    { url: Picture5, alt: "Library Image 5" },
    { url: Picture6, alt: "Library Image 6" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 50000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % heroImages.length
    );
  };

  const handlePointerClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden group">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white text-center p-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
              Welcome to Our Library
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl px-2 sm:px-4">
              Discover endless possibilities through reading and learning
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 flex justify-center space-x-1 sm:space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handlePointerClick(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400 hover:bg-gray-200'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;