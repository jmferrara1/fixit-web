import { test, expect } from '@playwright/test';

test('cart page loads', async ({ page }) => {
  await page.goto('/cart');
  await expect(page).toHaveURL(/cart/);
});
