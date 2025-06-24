import { test, expect } from '@playwright/test';

test('signup page loads', async ({ page }) => {
  await page.goto('/signup');
  await expect(page).toHaveURL(/signup/);
});
