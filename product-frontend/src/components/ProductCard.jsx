import { useState } from 'react';
import PropTypes from 'prop-types';
import ColorPicker from './ColorPicker';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
  const [currentColor, setCurrentColor] = useState('yellow');

  return (
    <div className="w-full scale-80">
      <div className="aspect-square flex items-center justify-center mb-4">
        <img
          src={product.images[currentColor]}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-150"
          loading="lazy"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-montserrat-medium text-gray-900 cursor-pointer hover:text-gray-600 transition-colors duration-150">
          {product.name}
        </h3>

        <p className="text-sm text-gray-900 font-montserrat-regular">
          ${product.price.toFixed(2)} USD
        </p>

        <ColorPicker
          selectedColor={currentColor}
          onColorChange={setCurrentColor}
        />

        <StarRating popularityScore={product.popularityScore} />
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    popularityScore: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    images: PropTypes.shape({
      yellow: PropTypes.string.isRequired,
      rose: PropTypes.string.isRequired,
      white: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductCard;


