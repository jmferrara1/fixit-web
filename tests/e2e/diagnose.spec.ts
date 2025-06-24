import { test, expect } from '@playwright/test';

test('AI diagnose reply', async ({ page }) => {
  await page.goto('/');
  await page.fill('textarea', 'My faucet is leaking');
  await page.press('textarea', 'Enter');
  await page.waitForSelector('.chat-message.assistant', { timeout: 30000 });
  const text = await page.textContent('.chat-message.assistant:last-child');
  expect(text).toBeTruthy();
});
