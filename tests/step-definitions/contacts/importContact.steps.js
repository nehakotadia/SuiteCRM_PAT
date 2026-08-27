import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

//const { createBdd } = require('playwright-bdd');
//const { expect } = require('@playwright/test');

const { Given, When, Then } = createBdd();

Given('the user clicks the Contacts tab', async ({ page }) => {
  await page.locator('a').filter({ hasText: /^Contacts$/ }).click();
});

When('the user clicks the Import Contacts button', async ({ page }) => {
 await page.getByRole('link', { name: 'Import Contacts' }).click();
});

Then('the Import Contacts page should be displayed', async ({ page }) => {
  await expect(page.locator('iframe').contentFrame().getByRole('heading', { name: 'Step 1: Upload Import File' })).toBeVisible();
});