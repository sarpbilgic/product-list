import { useState } from 'react';
import PropTypes from 'prop-types';
import { GOLD_COLORS, COLOR_ORDER } from '../constants/colors';

const ColorPicker = ({ selectedColor, onColorChange }) => {
  const [hoveredColor, setHoveredColor] = useState(null);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {COLOR_ORDER.map((color) => {
          const colorInfo = GOLD_COLORS[color];
          const isActive = selectedColor === color;
          
          return (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              onMouseEnter={() => setHoveredColor(color)}
              onMouseLeave={() => setHoveredColor(null)}
              className={`w-5 h-5 rounded-full transition-all ${
                isActive 
                  ? 'ring-2 ring-gray-800 ring-offset-1' 
                  : 'hover:scale-110'
              }`}
              style={{ backgroundColor: colorInfo.hex }}
              title={colorInfo.label}
            />
          );
        })}
      </div>

      <p className="text-xs text-gray-600 mt-1.5 font-avenir">
        {GOLD_COLORS[selectedColor].label}
      </p>

      {hoveredColor && (
        <div className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded px-2 py-1 text-xs text-gray-700 whitespace-nowrap z-10 font-avenir">
          {GOLD_COLORS[hoveredColor].label}
        </div>
      )}
    </div>
  );
};

ColorPicker.propTypes = {
  selectedColor: PropTypes.string.isRequired,
  onColorChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ColorPicker;


