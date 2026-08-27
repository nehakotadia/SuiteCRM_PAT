import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

//const { createBdd } = require('playwright-bdd');
//const { expect } = require('@playwright/test');

const { Given, When, Then } = createBdd();

Given('View Contact: the user clicks Contacts tab', async ({ page }) => {
  await page.locator('a').filter({ hasText: /^Contacts$/ }).click(); 
});

When('View Contact: the user clicks View Contact', async ({ page }) => {
  await page.getByRole('link', { name: 'View Contacts' }).click();
});

Then('View Contact: the list of existing contacts should be displayed with the page title "Contacts"', async ({ page }) => {
  await expect(await page.getByText('CONTACTS', { exact: true })).toBeVisible();
});