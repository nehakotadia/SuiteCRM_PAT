// @ts-check

import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import 'dotenv/config';

const testDir = defineBddConfig({
  features: 'tests/features/**/*.feature',
  steps: ['tests/step-definitions/**/*.js', 'tests/hooks/**/*.js'],
});

export default defineConfig({

  testDir,

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    headless: !!process.env.CI,

    baseURL: process.env.BASE_URL,

    screenshot: 'only-on-failure',

    trace: 'on-first-retry',
  },

  projects: [
     {
      name: 'setup',
      testDir: 'tests/fixtures',
      testMatch: /auth\.setup\.js/,
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',              
      },
      dependencies: ['setup'],
    },
  ],

});