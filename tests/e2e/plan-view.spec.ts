import { test, expect } from '@playwright/test';

test('plan view loads', async ({ page }) => {
  await page.goto('/plans');
  await expect(page).toHaveURL(/plans/);
});
