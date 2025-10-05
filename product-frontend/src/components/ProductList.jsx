import { useState, useEffect } from 'react';
import { productApi } from '../utils/api';
import ProductCarousel from './ProductCarousel';
import FilterPanel from './FilterPanel';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [activeFilters, setActiveFilters] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await productApi.getProducts(filters);
      setProducts(data.data);
      setTotal(data.total || data.count);
      setActiveFilters(data.filters);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setFirstLoad(false);
    }
  };

  if (firstLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-5xl mb-4">⚠️</p>
          <h2 className="text-xl font-medium mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => loadProducts()}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl md:text-4xl font-avenir font-normal tracking-wide">Product List</h1>

        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-gray-600 font-montserrat-regular">
            {loading ? (
              'Loading...'
            ) : (
              <>
                <span className="font-montserrat-medium">{products.length}</span>
                {activeFilters && total > products.length && (
                  <span className="text-gray-400"> of {total}</span>
                )}
                <span className="text-gray-400"> products</span>
                {activeFilters && (
                  <span className="ml-2 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                    filtered
                  </span>
                )}
              </>
            )}
          </div>
          <FilterPanel onFilterChange={loadProducts} isLoading={loading} />
        </div>

        <div className="relative">
          {loading && !firstLoad && (
            <div className="absolute inset-0 bg-white/75 flex items-center justify-center z-50">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
            </div>
          )}
          
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-2">No products found</p>
            </div>
          ) : (
            <ProductCarousel products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
