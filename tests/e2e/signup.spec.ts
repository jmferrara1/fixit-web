import { test, expect } from '@playwright/test';

test('signup flow redirects to dashboard', async ({ page }) => {
  await page.goto('/auth/signup');
  await page.fill('input[type=email]', 'user@example.com');
  await page.click('text=Sign up / Sign in');
  await page.waitForURL(/dashboard/);
  await expect(page).toHaveURL(/dashboard/);
});
