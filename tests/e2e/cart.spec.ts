import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.setDefaultTimeout(30000);
});

test('add items to cart and checkout URL', async ({ page }) => {
  await page.goto('/cart');
  await page.evaluate(() => {
    window.__cart.addItem({ id: 'sku1', name: 'Bolt', price: 1, sku: 'sku1', quantity: 2 });
  });
  await page.reload();
  await page.waitForSelector('.cart-item');
  const subtotal = await page.locator('text=Subtotal').textContent();
  expect(subtotal).toContain('2.00');
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('button#checkout'),
  ]);
  await expect(popup.url()).toContain('sku1:2');
});
