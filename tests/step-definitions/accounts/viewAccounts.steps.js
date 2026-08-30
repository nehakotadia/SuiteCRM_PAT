const { createBdd } = require('playwright-bdd');
const { AccountPage } = require('../../pages/AccountsPage.js');
const logger = require('../../utils/logger.js');

const { Given, When, Then } = createBdd();

Given('the user navigates to the Accounts page', async ({ page }) => {
  logger.info('Step: navigate to Accounts page');
  const accountPage = new AccountPage(page);
  await accountPage.navigateToAccounts();
});

When('the user clicks View Account', async ({ page }) => {
  logger.info('Step: click View Account');
  const accountPage = new AccountPage(page);
  await accountPage.clickViewAccount();
});

Then('the list of existing accounts should be displayed with the page title "Accounts"', async ({ page }) => {
  logger.info('Step: verify Accounts page listing');
  const accountPage = new AccountPage(page);
  await accountPage.verifyAccountsPage();
});