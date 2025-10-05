import PropTypes from 'prop-types';
import { StarIcon as SolidStar } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStar } from '@heroicons/react/24/outline';

const StarRating = ({ popularityScore }) => {
  const rating = (popularityScore * 5).toFixed(1);
  const fullStars = Math.floor(rating);
  const hasHalfStar = (rating % 1) >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => {
          const starNumber = i + 1;
          const isFilled = starNumber <= fullStars;
          const isHalf = starNumber === fullStars + 1 && hasHalfStar;

          return (
            <div key={i} className="relative w-3.5 h-3.5">
              {isFilled ? (
                <SolidStar className="text-orange-400" />
              ) : isHalf ? (
                <>
                  <OutlineStar className="absolute text-gray-300" />
                  <SolidStar
                    className="absolute text-orange-400"
                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                  />
                </>
              ) : (
                <OutlineStar className="text-gray-300" />
              )}
            </div>
          );
        })}
      </div>
      <span className="text-xs text-gray-600 font-avenir">{rating}/5</span>
    </div>
  );
};

StarRating.propTypes = {
  popularityScore: PropTypes.number.isRequired,
};

export default StarRating;
