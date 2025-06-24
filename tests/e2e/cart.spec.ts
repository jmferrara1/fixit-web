import { test, expect } from '@playwright/test';

test('cart checkout popup', async ({ page }) => {
  await page.goto('/dashboard/last');
  await page.click('button:has-text("Add to Cart")');
  await page.click('.mini-cart-icon');
  await page.click('button:has-text("Checkout")');
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('button:has-text("Checkout")'),
  ]);
  expect(popup.url()).toContain('homedepot.com');
});
