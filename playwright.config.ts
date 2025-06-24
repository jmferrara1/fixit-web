import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  use: {
    browserName: 'chromium',
    channel: 'chrome',
    // @ts-ignore - downloadsPath not typed in Playwright config
    downloadsPath: './playwright-browsers',
    headless: true,
  },
});
