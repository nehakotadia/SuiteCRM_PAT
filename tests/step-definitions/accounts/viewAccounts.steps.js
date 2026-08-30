const { createBdd } = require('playwright-bdd');
const { AccountPage } = require('../../pages/AccountsPage.js');

const { Given, When, Then } = createBdd();

Given('the user navigates to the Accounts page', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.navigateToAccounts();
});

When('the user clicks View Account', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.clickViewAccount();
});

Then('the list of existing accounts should be displayed with the page title "Accounts"', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.verifyAccountsPage();
});