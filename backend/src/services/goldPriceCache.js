import { getGoldPrice } from "./goldPrice.js";

// 5 minutes
const CACHE_TIME = 5 * 60 * 1000;

let goldPrice = null;
let lastUpdated = null;

export async function getCachedGoldPrice() {
  const now = Date.now();
  
  // Use cached price if we fetched it recently
  if (goldPrice && lastUpdated && (now - lastUpdated) < CACHE_TIME) {
    return goldPrice;
  }

  goldPrice = await getGoldPrice();
  lastUpdated = now;
  
  return goldPrice;
}

