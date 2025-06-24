import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.setDefaultTimeout(30000);
});

test('send a message and receive reply', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[type=text]', 'hello');
  await page.press('input[type=text]', 'Enter');
  await expect(page.locator('.bg-gray-200'), { timeout: 30000 }).toBeVisible();
  const bubbles = await page.locator('.bg-gray-200').count();
  expect(bubbles).toBeGreaterThan(0);
});
