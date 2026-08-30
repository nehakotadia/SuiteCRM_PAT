// @ts-check

const { defineConfig, devices } = require('@playwright/test');
const { defineBddConfig } = require('playwright-bdd');
require('dotenv/config');

const testDir = defineBddConfig({
  features: 'tests/features/**/*.feature',
  steps: ['tests/step-definitions/**/*.js', 'tests/hooks/**/*.js'],
});

module.exports = defineConfig({
  timeout: 240000,

  testDir,

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
        ['html', {
            outputFolder: 'playwright-report',
            open: 'always'
        }],

        ['allure-playwright', {
            resultsDir: 'allure-results'
        }]
    ],

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