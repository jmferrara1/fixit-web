import { test, expect } from '@playwright/test';

test('add items to cart and checkout URL', async ({ page }) => {
  await page.goto('/cart');
  await page.evaluate(() => {
    window.__cart.addItem({ id: 'sku1', name: 'Bolt', price: 1, sku: 'sku1', quantity: 2 });
  });
  await page.reload();
  const subtotal = await page.locator('text=Subtotal').textContent();
  expect(subtotal).toContain('2.00');
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('text=Checkout'),
  ]);
  expect(popup.url()).toContain('sku1:2');
});
