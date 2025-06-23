export async function checkStock(sku: string) {
  const key = process.env.HOME_DEPOT_KEY;
  // TODO: call Home Depot API
  return { sku, stock: 'unknown', key };
}

export async function addToCart(sku: string, qty: number) {
  // TODO: implement
  return { sku, qty };
}
