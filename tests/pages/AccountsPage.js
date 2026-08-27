import { expect } from '@playwright/test';

export class AccountPage {
  constructor(page) {
    this.page = page;

    this.accountsTab = page.locator('a').filter({hasText: /^Accounts$/});
    this.createAccountLink = page.getByRole('link', {name: 'Create Account'});    
    this.createLabel = page.getByLabel('Create');
    this.accountName = page.getByRole('textbox').nth(1);
    this.saveButton = page.getByRole('button', {name: 'Save'});
    this.successMessage = page.locator('scrm-dynamic-label');

    this.importAccountLink = page.getByRole('link', {name: 'Import Accounts'});
    this.importLabel = page.locator('iframe').contentFrame().getByRole('heading', { name: 'Step 1: Upload Import File', exact: true });

    this.accountsLabel = page.getByText('ACCOUNTS', { exact: true });
  }

  async navigateToAccounts() {
    await this.accountsTab.click();
  }

  async clickCreateAccount() {
    await this.createAccountLink.click();
    await expect(this.createLabel).toBeVisible();
  }

  async clickImportAccount() {
    await this.importAccountLink.click();
  }

  async verifyImportAccountPage() {
    await expect(this.importLabel).toBeVisible();
  }

  async verifyAccountsPage() {
    await expect(this.accountsLabel).toBeVisible();
  }

  async enterAccountName(accountName) {
    await this.accountName.fill(accountName);
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async verifyAccountCreated(expectedResult) {
    await expect(this.successMessage.getByText(expectedResult)).toBeVisible();
  }
}