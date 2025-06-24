import { test, expect } from '@playwright/test';

test('plan page renders viewer', async ({ page }) => {
  await page.goto('/dashboard/test-plan');
  await expect(page.locator('text=Plan test-plan')).toBeVisible();
});
