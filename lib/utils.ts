export function extractPrice(...elements:any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      // Fiyat metnindeki Türk Lirası sembolünü (₺) temizle
      const cleanPrice = priceText.replace(',', '.').replace(/[^\d.]/g, '');

      let firstPrice;

      if (cleanPrice) {
        // Fiyatı çıkarmak için uygun desen
        firstPrice = cleanPrice.match(/\d+(\.\d{1,2})/)?.[0];
      }
      return firstPrice || cleanPrice;

    }
  }

  return '';
}

export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 2);
  return currencyText ? currencyText : "";
}

// Extracts description from two possible elements from amazon
export function extractDescription($: any) {
  // these are possible elements holding description of the product
  const selectors = [
    ".a-unordered-list .a-list-item",
    ".a-expander-content p",
    // Add more selectors here if needed
  ];

  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }

  // If no matching elements were found, return an empty string
  return "";
}