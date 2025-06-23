export function affiliateUrl(asin: string) {
  const tag = process.env.AMAZON_AFFILIATE_TAG;
  return `https://www.amazon.com/dp/${asin}/?tag=${tag}`;
}
