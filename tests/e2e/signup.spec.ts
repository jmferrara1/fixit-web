import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.setDefaultTimeout(30000);
});

test('signup flow redirects to dashboard', async ({ page }) => {
  await page.goto('/auth/signup');
  await page.fill('input[type=email]', 'user@example.com');
  await page.click('text=Sign up / Sign in');
  await page.waitForURL(/dashboard/, { timeout: 30000 });
  await expect(page).toHaveURL(/dashboard/);
});
