import { useState } from 'react';
import PropTypes from 'prop-types';

const FilterPanel = ({ onFilterChange, isLoading }) => {
  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPop, setMinPop] = useState('');
  const [maxPop, setMaxPop] = useState('');

  const hasFilters = minPrice || maxPrice || minPop || maxPop;

  const applyFilters = () => {
    const filters = {};
    if (minPrice) filters.minPrice = parseFloat(minPrice);
    if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
    if (minPop) filters.minPopularity = parseFloat(minPop) / 5;
    if (maxPop) filters.maxPopularity = parseFloat(maxPop) / 5;
    onFilterChange(filters);
    setOpen(false);
  };

  const resetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinPop('');
    setMaxPop('');
    onFilterChange({});
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-montserrat-regular"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
        {hasFilters && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          
          <div className="absolute top-full right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-montserrat-medium">Filter Products</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-montserrat-medium mb-2 block">Price (USD)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm font-montserrat-regular"
                    min="0"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm font-montserrat-regular"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-montserrat-medium mb-2 block">
                  Popularity Rating
                  <span className="ml-1 text-xs text-gray-500">(0-5)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPop}
                    onChange={(e) => setMinPop(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm font-montserrat-regular"
                    min="0"
                    max="5"
                    step="0.5"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPop}
                    onChange={(e) => setMaxPop(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm font-montserrat-regular"
                    min="0"
                    max="5"
                    step="0.5"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={applyFilters}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded text-sm font-montserrat-medium hover:bg-gray-800 disabled:opacity-50"
                >
                  Apply
                </button>
                <button
                  onClick={resetFilters}
                  disabled={isLoading}
                  className="px-4 py-2 border rounded text-sm font-montserrat-regular hover:bg-gray-50 disabled:opacity-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

FilterPanel.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default FilterPanel;
