const { createBdd } = require('playwright-bdd');
const { AccountPage } = require('../../pages/AccountsPage.js');

const { Given, When, Then } = createBdd();

Given('the user clicks the accounts tab', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.navigateToAccounts();
});

When('the user clicks the Import Accounts button', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.clickImportAccount();
});

Then('the Import Accounts page should be displayed', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.verifyImportAccountPage();
});