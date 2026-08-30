const { expect } = require('@playwright/test');

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
    this.importLabel = page.locator('iframe').contentFrame().getByRole('heading', { name: 'Step 1: Upload Import File', exact: true });

    this.viewAccountLink = page.getByRole('link', {name: 'View Accounts'});
    this.accountsLabel = page.getByText('ACCOUNTS', { exact: true });

    this.invalidNameerrorMessage = page.getByText('Missing required field: Name');
    this.invalidEmailErrorMessage = page.getByText('Invalid email format.');
    this.invalidPhoneNumberErrorMessage = page.getByText('Invalid phone format.');
  }

  async navigateToAccounts() {
    await this.accountsTab.click();
  }

  async navigateToAccountsAfterCreate() {
    await this.accountsTabAfterCreate.click();
  }

  async clickCreateAccount() {
    await this.createAccountLink.click();
    await expect(this.createLabel).toBeVisible({ timeout: 240000 });
  }

  async clickImportAccount() {
    await this.importAccountLink.click();
  }

  async clickViewAccount() {
    await this.viewAccountLink.click();
  }
  
  async verifyImportAccountPage() {
    await expect(this.importLabel).toBeVisible({ timeout: 240000 });
  }

  async verifyAccountsPage() {
    await expect(this.accountsLabel).toBeVisible({ timeout: 240000 });
  }

  async enterAccountName(accountName) {
    await this.accountName.fill(accountName);
  }

  async enterInvalidEmail() {
    await this.emailAddress.fill('abc');
  }

  async enterInvalidPhoneNumber() {
    await this.officePhone.fill('dg');
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async verifyAccountCreated(expectedResult) {
    await expect(this.successMessage.getByText(expectedResult)).toBeVisible({ timeout: 240000 });
  }

  async verifyNameErrorMessage() {
    await expect(this.invalidNameerrorMessage).toBeVisible({ timeout: 240000 });
  }

  async verifyInvalidEmailErrorMessage() {
    await expect(this.invalidEmailErrorMessage).toBeVisible({ timeout: 240000 });
  }

  async verifyInvalidPhoneNumberErrorMessage() {
    await expect(this.invalidPhoneNumberErrorMessage).toBeVisible({ timeout: 240000 });
  }
};

module.exports = { AccountPage };