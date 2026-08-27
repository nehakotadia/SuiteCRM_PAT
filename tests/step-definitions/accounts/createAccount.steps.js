import { createBdd } from 'playwright-bdd';
import { AccountPage } from '../../pages/AccountsPage.js';
import { readExcel } from '../../utils/excelReader.js';

const { Given, When, Then } = createBdd();

const accountData = readExcel('Accounts');

Given('the user navigates to the Accounts tab', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.navigateToAccounts();
});

Given('the user clicks the Create Account button', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.clickCreateAccount();
});

When('the user clicks Save button after entering valid information in all mandatory fields', async ({ page }) => {
  const data = accountData.find(row => row.TestCase === 'TC001');
  const accountPage = new AccountPage(page);
  await accountPage.enterAccountName(data.AccountName);
  await accountPage.clickSave();
});

Then('the account should be created successfully', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.verifyAccountCreated(accountData.find(row => row.TestCase === 'TC001').ExpectedResult);
});