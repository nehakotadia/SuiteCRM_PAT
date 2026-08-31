const { expect } = require('@playwright/test');
const logger = require('../utils/logger.js');

class AccountPage {
  constructor(page) {
    this.page = page;

    this.accountsTab = page.locator('a').filter({hasText: /^Accounts$/ , exact: true});
    this.accountsTabAfterCreate = page.locator('a').nth(1);
    this.createAccountLink = page.getByRole('link', {name: 'Create Account'});    
    this.createLabel = page.getByLabel('Create');
    this.accountName = page.getByRole('textbox').nth(1);
    this.officePhone = page.getByRole('textbox').nth(3);
    this.emailAddress = page.locator('scrm-composite-field').getByRole('textbox');
    this.saveButton = page.getByRole('button', {name: 'Save'});
    this.successMessage = page.locator('scrm-dynamic-label');

    this.importAccountLink = page.getByRole('link', {name: 'Import Accounts'});
    this.importLabel = page.locator('iframe').contentFrame().getByRole('heading', { name: 'Step 1: Upload Import File'});

    this.viewAccountLink = page.getByRole('link', {name: 'View Accounts'});
    this.accountsLabel = page.getByText('ACCOUNTS', { exact: true });

    this.invalidNameerrorMessage = page.getByText('Missing required field: Name');
    this.invalidEmailErrorMessage = page.getByText('Invalid email format.');
    this.invalidPhoneNumberErrorMessage = page.getByText('Invalid phone format.');
  }

  async navigateToAccounts() {
    logger.info('Opening Accounts tab');
    await this.accountsTab.click();
  }

  async navigateToAccountsAfterCreate() {
    logger.info('Returning to Accounts list after creating account');
    await this.accountsTabAfterCreate.click();
  }

  async clickCreateAccount() {
    logger.info('Clicking Create Account');
    await this.createAccountLink.click();
    await expect(this.createLabel).toBeVisible({ timeout: 240000 });
  }

  async clickImportAccount() {
    logger.info('Opening Import Accounts page');
    await this.importAccountLink.click();
  }

  async clickViewAccount() {
    logger.info('Opening View Accounts page');
    await this.viewAccountLink.click();
  }
  
  async verifyImportAccountPage() {
    logger.info('Verifying Import Accounts page is visible');
    await expect(this.importLabel).toBeVisible({ timeout: 240000 });
  }

  async verifyAccountsPage() {
    logger.info('Verifying Accounts page is visible');
    await expect(this.accountsLabel).toBeVisible({ timeout: 240000 });
  }

  async enterAccountName(accountName) {
    logger.info(`Entering account name: ${accountName}`);
    await this.accountName.fill(accountName);
  }

  async enterInvalidEmail() {
    logger.info('Entering invalid email value');
    await this.emailAddress.fill('abc');
  }

  async enterInvalidPhoneNumber() {
    logger.info('Entering invalid phone number');
    await this.officePhone.fill('dg');
  }

  async clickSave() {
    logger.info('Clicking Save button');
    await this.saveButton.click();
  }

  async verifyAccountCreated(expectedResult) {
    logger.info(`Checking account creation message: ${expectedResult}`);
    await expect(this.successMessage.getByText(expectedResult)).toBeVisible({ timeout: 240000 });
  }

  async verifyNameErrorMessage() {
    logger.info('Checking required Name validation message');
    await expect(this.invalidNameerrorMessage).toBeVisible({ timeout: 240000 });
  }

  async verifyInvalidEmailErrorMessage() {
    logger.info('Checking invalid email validation message');
    await expect(this.invalidEmailErrorMessage).toBeVisible({ timeout: 240000 });
  }

  async verifyInvalidPhoneNumberErrorMessage() {
    logger.info('Checking invalid phone validation message');
    await expect(this.invalidPhoneNumberErrorMessage).toBeVisible({ timeout: 240000 });
  }
};

module.exports = { AccountPage };