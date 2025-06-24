import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.setDefaultTimeout(30000);
});

test('plan page renders viewer', async ({ page }) => {
  await page.goto('/dashboard/test-plan');
  await expect(page.locator('text=Plan test-plan'), { timeout: 30000 }).toBeVisible();
});
