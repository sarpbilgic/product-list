import axios from "axios";

export async function getGoldPrice() {
  try {
    const response = await axios.get("https://www.goldapi.io/api/XAU/USD", {
      headers: {
        "x-access-token": process.env.GOLD_API_KEY,
        "Content-Type": "application/json"
      }
    });

    return response.data.price_gram_24k;
  } catch (error) {
    console.error("Failed to fetch gold price:", error.message);
    throw new Error("Unable to fetch gold price");
  }
}

