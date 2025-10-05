import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { getCachedGoldPrice } from "./goldPriceCache.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedProducts = null;

async function loadProducts() {
  if (cachedProducts) {
    return cachedProducts;
  }

  const productsPath = path.join(__dirname, "../data/products.json");
  const data = await fs.readFile(productsPath, "utf-8");
  cachedProducts = JSON.parse(data);
  
  return cachedProducts;
}

function calculatePrice(weight, popularityScore, goldPrice) {
  const price = (popularityScore + 1) * goldPrice * weight;
  return Number(price.toFixed(2));
}

export async function getProductsWithPrices() {
  const products = await loadProducts();
  const goldPrice = await getCachedGoldPrice();

  return products.map(product => ({
    ...product,
    price: calculatePrice(product.weight, product.popularityScore, goldPrice)
  }));
}

export function filterProducts(products, filters) {
  return products.filter(product => {
    //price range
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;

    //popularity
    if (filters.minPopularity && product.popularityScore < filters.minPopularity) return false;
    if (filters.maxPopularity && product.popularityScore > filters.maxPopularity) return false;

    return true;
  });
}

export function parseFilters(query) {
  const filters = {};

  if (query.minPrice) {
    const num = parseFloat(query.minPrice);
    if (isNaN(num) || num < 0) {
      throw new Error("minPrice must be a positive number");
    }
    filters.minPrice = num;
  }

  if (query.maxPrice) {
    const num = parseFloat(query.maxPrice);
    if (isNaN(num) || num < 0) {
      throw new Error("maxPrice must be a positive number");
    }
    filters.maxPrice = num;
  }

  if (query.minPopularity) {
    const num = parseFloat(query.minPopularity);
    if (isNaN(num) || num < 0 || num > 1) {
      throw new Error("minPopularity must be between 0 and 1");
    }
    filters.minPopularity = num;
  }

  if (query.maxPopularity) {
    const num = parseFloat(query.maxPopularity);
    if (isNaN(num) || num < 0 || num > 1) {
      throw new Error("maxPopularity must be between 0 and 1");
    } 
    filters.maxPopularity = num;
  }

  // Make sure the ranges make sense
  if (filters.minPrice && filters.maxPrice && filters.minPrice > filters.maxPrice) {
    throw new Error("minPrice can't be higher than maxPrice");
  }

  if (filters.minPopularity && filters.maxPopularity && filters.minPopularity > filters.maxPopularity) {
    throw new Error("minPopularity can't be higher than maxPopularity");
  }

  return filters;
}

