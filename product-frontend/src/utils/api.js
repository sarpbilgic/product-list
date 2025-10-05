import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const productApi = {
  /**
   * Fetch all products with optional filters
   * @param {Object} filters - Filter options
   * @param {number} filters.minPrice - Minimum price
   * @param {number} filters.maxPrice - Maximum price
   * @param {number} filters.minPopularity - Minimum popularity (0-1)
   * @param {number} filters.maxPopularity - Maximum popularity (0-1)
   * @returns {Promise} Product data
   */
  getProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.minPopularity) params.append('minPopularity', filters.minPopularity);
      if (filters.maxPopularity) params.append('maxPopularity', filters.maxPopularity);

      const response = await axios.get(`${API_BASE_URL}/api/products`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  }
};


