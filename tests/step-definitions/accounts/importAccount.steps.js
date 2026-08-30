const { createBdd } = require('playwright-bdd');
const { AccountPage } = require('../../pages/AccountsPage.js');
const logger = require('../../utils/logger.js');

const { Given, When, Then } = createBdd();

Given('the user clicks the accounts tab', async ({ page }) => {
  logger.info('Step: open Accounts tab for import flow');
  const accountPage = new AccountPage(page);
  await accountPage.navigateToAccounts();
});

When('the user clicks the Import Accounts button', async ({ page }) => {
  logger.info('Step: click Import Accounts button');
  const accountPage = new AccountPage(page);
  await accountPage.clickImportAccount();
});

Then('the Import Accounts page should be displayed', async ({ page }) => {
  logger.info('Step: verify Import Accounts page');
  const accountPage = new AccountPage(page);
  await accountPage.verifyImportAccountPage();
});