# Product Listing API

Backend for a product listing app with dynamic pricing based on real-time gold prices.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file:
   ```
   GOLD_API_KEY=your_api_key_here
   PORT=4000
   ```
   
   Get your API key from https://www.goldapi.io/

3. Start the server:
   ```bash
   npm run dev
   ```

## API

### Get Products
```
GET /api/products
```

Returns all products with calculated prices.

**Filters:**
- `minPrice` / `maxPrice` - Filter by price range
- `minPopularity` / `maxPopularity` - Filter by popularity score (0-1)

**Examples:**
```bash
# All products
curl http://localhost:4000/api/products

# Price range
curl "http://localhost:4000/api/products?minPrice=100&maxPrice=300"

# Popular items
curl "http://localhost:4000/api/products?minPopularity=0.8"
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "name": "Engagement Ring 1",
      "popularityScore": 0.85,
      "weight": 2.1,
      "images": { "yellow": "...", "rose": "...", "white": "..." },
      "price": 255.67
    }
  ]
}
```

## How it works

Prices are calculated using: `(popularityScore + 1) × goldPrice × weight`

- Gold prices are cached for 5 minutes (no need to hit the API every request)
- Products are loaded from `src/data/products.json`
- Everything is cached in memory for fast responses

