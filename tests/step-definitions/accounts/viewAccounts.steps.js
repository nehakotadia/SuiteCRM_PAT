import { createBdd } from 'playwright-bdd';
import { AccountPage } from '../../pages/AccountsPage.js';

const { Given, When, Then } = createBdd();

Given('the user navigates to the Accounts page', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.navigateToAccounts();
});

Then('the list of existing accounts should be displayed with the page title "Accounts"', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.verifyAccountsPage();
});