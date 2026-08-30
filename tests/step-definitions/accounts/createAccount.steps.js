const { createBdd } = require('playwright-bdd');
const { AccountPage } = require('../../pages/AccountsPage.js');
const { readExcel } = require('../../utils/excelReader.js');
const logger = require('../../utils/logger.js');

const { Given, When, Then } = createBdd();

const accountData = readExcel('Accounts');

Given('the user navigates to the Accounts tab', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.navigateToAccounts();
  logger.info('Navigated to Accounts tab');
});

Given('the user clicks the Create Account button', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await accountPage.clickCreateAccount();
  logger.info('Clicked Create Account button');
});

  When('the user clicks Save button after entering valid information in all mandatory fields', async ({ page }) => {
   
    for (let rowIndex = 0; rowIndex < accountData.length; rowIndex++) {
      logger.info(`Processing row ${rowIndex + 1} of account data`);
      const data = accountData[rowIndex];
      logger.info(`Entering account name: ${data.AccountName}`);
      //const data = accountData.find(row => row.TestCase === 'TC001');
      const accountPage = new AccountPage(page);
      await accountPage.enterAccountName(data.AccountName);
      await accountPage.clickSave();
      logger.info('Clicked Save button');
      logger.info(`Verifying account creation with expected result: ${data.ExpectedResult}`);
      await accountPage.verifyAccountCreated(data.ExpectedResult);
      logger.info('Verified account created successfully');    
      await accountPage.navigateToAccountsAfterCreate();
      logger.info('Navigated back to Accounts tab for next iteration');  
      await accountPage.clickCreateAccount();
      
      logger.info('Clicked Create Account button for next iteration');
    };

  });

  When('the user clicks Save without entering the Name', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await accountPage.clickCreateAccount();
    logger.info('Clicked Create Account button');
    await accountPage.clickSave();
    logger.info('Clicked Save button without entering Name');
  });

  Then('the Name required error message should be displayed', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await accountPage.verifyNameErrorMessage();
    logger.info('Verified error message for missing Name field');
  });

  When('the user clicks save after entering invalid email "abc"', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await accountPage.clickCreateAccount();
    logger.info('Clicked Create Account button');
    await accountPage.enterInvalidEmail();
    await accountPage.clickSave();
    logger.info('Clicked Save button after entering invalid email');
  });

  Then('the invalid email error message should be displayed', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await accountPage.verifyInvalidEmailErrorMessage();
    logger.info('Verified error message for invalid email');
  });

  When('the user clicks save after entering invalid office phone "dg"', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await accountPage.clickCreateAccount();
    logger.info('Clicked Create Account button');
    await accountPage.enterInvalidPhoneNumber();
    await accountPage.clickSave();
    logger.info('Clicked Save button after entering invalid phone number');
  });

  Then('the invalid phone error message should be displayed', async ({ page }) => {
    const accountPage = new AccountPage(page);
    await accountPage.verifyInvalidPhoneNumberErrorMessage();
    logger.info('Verified error message for invalid phone number');
  });