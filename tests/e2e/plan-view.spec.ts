import { test, expect } from '@playwright/test';

test('plan creation & view', async ({ page }) => {
  await page.goto('/');
  await page.fill('textarea', 'clogged drain');
  await page.press('textarea', 'Enter');
  await page.waitForSelector('a:has-text("View Plan")');
  const [nav] = await Promise.all([
    page.waitForNavigation(),
    page.click('a:has-text("View Plan")'),
  ]);
  await expect(page.locator('ol li')).toHaveCountGreaterThan(0);
});
