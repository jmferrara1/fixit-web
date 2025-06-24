import { test, expect } from '@playwright/test';

test('diagnose page loads', async ({ page }) => {
  await page.goto('/diagnose');
  await expect(page).toHaveURL(/diagnose/);
});
