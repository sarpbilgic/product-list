import { getProductsWithPrices, filterProducts, parseFilters } from "../services/productService.js";

export async function getProducts(req, res) {
  try {
    const filters = parseFilters(req.query);
    const products = await getProductsWithPrices();
    const filtered = filterProducts(products, filters);

    res.json({
      success: true,
      total: products.length,
      count: filtered.length,
      filters: Object.keys(filters).length > 0 ? filters : null,
      data: filtered
    });
  } catch (error) {
    console.error("Error:", error.message);
    
    const isBadRequest = error.message.includes("must") || error.message.includes("can't");
    
    res.status(isBadRequest ? 400 : 500).json({
      success: false,
      message: error.message
    });
  }
}

