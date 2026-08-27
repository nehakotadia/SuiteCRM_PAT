import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { readExcel } from '../../utils/excelReader.js';

//const { createBdd } = require('playwright-bdd');
//const { expect } = require('@playwright/test');

const { Given, When, Then } = createBdd();
const contactData = readExcel('Contacts');


Given('the user navigates to the Contacts tab', async ({ page }) => {
  await page.locator('a').filter({ hasText: /^Contacts$/ }).click();
});

Given('the user clicks the Create contact button', async ({ page }) => {
  await page.getByRole('link', { name: 'Create Contact', exact: true }).click();
  await expect(page.getByLabel('Create')).toBeVisible();
});

When('the user clicks Save button after entering valid information in mandatory fields', async ({ page }) => {
  const data = contactData.find(row => row.TestCase === 'TC001');
   await page.getByRole('textbox').nth(2).fill(data.LastName);
   await page.getByRole('button', { name: 'Save' }).click();
});

Then('the contact should be created successfully', async ({ page }) => {
  await expect(page.locator('scrm-dynamic-label').getByText(contactData.find(row => row.TestCase === 'TC001').ExpectedResult)).toBeVisible();
  //await page.getByText('ABC Technologies', { exact: true }).toBeVisible();
});