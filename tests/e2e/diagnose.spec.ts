import { test, expect } from '@playwright/test';

test('send a message and receive reply', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[type=text]', 'hello');
  await page.press('input[type=text]', 'Enter');
  await page.waitForSelector('.bg-gray-200');
  const bubbles = await page.locator('.bg-gray-200').count();
  expect(bubbles).toBeGreaterThan(0);
});
