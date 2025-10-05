import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSwipeable } from 'react-swipeable';
import ProductCard from './ProductCard';

const ProductCarousel = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [dragging, setDragging] = useState(false);
  const carouselRef = useRef(null);

  const maxSlide = Math.max(0, products.length - itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerPage(1);
      else if (width < 1024) setItemsPerPage(2);
      else if (width < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e) => {
      const progressBar = document.querySelector('.progress-bar-track');
      if (!progressBar) return;
      
      const rect = progressBar.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percent = x / rect.width;
      const slide = Math.round(percent * maxSlide);
      setCurrentSlide(Math.max(0, Math.min(slide, maxSlide)));
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, maxSlide]);
  
  const nextSlide = () => {
    if (currentSlide < maxSlide) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    onSwiping: (eventData) => {
      if (Math.abs(eventData.deltaX) > 10) {
        carouselRef.current?.style.setProperty('cursor', 'grabbing');
      }
    },
    onSwiped: () => {
      if (carouselRef.current) {
        carouselRef.current.style.removeProperty('cursor');
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
    delta: 10,
  });

  return (
    <div className="relative max-w-7xl mx-auto px-2 md:px-4">
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`absolute left-0 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${
          currentSlide > 0 ? 'hover:bg-gray-50' : 'opacity-40 cursor-not-allowed'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        {...swipeHandlers}
        ref={carouselRef}
        className="overflow-hidden"
      >
        <div
          className="flex gap-3 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / itemsPerPage)}%)`,
          }}
        >
          {products.map((product, idx) => (
            <div
              key={idx}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / itemsPerPage}% - ${(12 * (itemsPerPage - 1)) / itemsPerPage}px)` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        disabled={currentSlide >= maxSlide}
        className={`absolute right-0 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${
          currentSlide < maxSlide ? 'hover:bg-gray-50' : 'opacity-40 cursor-not-allowed'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="mt-8 max-w-2xl mx-auto px-2">
        <div 
          className={`progress-bar-track h-1.5 bg-gray-200 rounded-full relative ${dragging ? 'bg-gray-300' : 'hover:bg-gray-250'}`}
          onMouseDown={(e) => {
            setDragging(true);
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            const percent = x / rect.width;
            const slide = Math.round(percent * maxSlide);
            setCurrentSlide(Math.max(0, Math.min(slide, maxSlide)));
          }}
        >
          <div
            className="h-full bg-gray-500 rounded-full relative pointer-events-none"
            style={{
              width: `${((currentSlide + 1) / (maxSlide + 1)) * 100}%`,
              transition: dragging ? 'none' : 'width 0.3s ease',
            }}
          >
            <div 
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-700 rounded-full shadow-lg cursor-grab ${
                dragging ? 'scale-125 cursor-grabbing' : 'hover:scale-110'
              } transition-transform`}
              style={{ marginRight: '-8px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCarousel.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      popularityScore: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
      images: PropTypes.shape({
        yellow: PropTypes.string.isRequired,
        rose: PropTypes.string.isRequired,
        white: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default ProductCarousel;


