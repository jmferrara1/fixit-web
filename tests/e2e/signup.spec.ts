import { test, expect } from '@playwright/test';

test('signup flow', async ({ page }) => {
  await page.goto('/auth/signup');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'Password123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
