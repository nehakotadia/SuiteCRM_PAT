const { expect } = require('@playwright/test');

class ContactPage {
  constructor(page) {
    this.page = page;

    this.contactsTab = page.locator('a').filter({hasText: /^Contacts$/});
    this.createContactLink = page.getByRole('link', {name: 'Create Contact' , exact : true});    
    this.createLabel = page.getByLabel('Create');
    this.contactName = page.getByRole('textbox').nth(2);
    this.saveButton = page.getByRole('button', {name: 'Save'});
    this.successMessage = page.locator('scrm-dynamic-label');

    this.importContactLink = page.getByRole('link', {name: 'Import Contacts'});
    this.importLabel = page.locator('iframe').contentFrame().getByRole('heading', { name: 'Step 1: Upload Import File', exact: true });

    this.viewContactLink = page.getByRole('link', {name: 'View Contacts'});
    this.contactsLabel = page.getByText('CONTACTS', { exact: true });
  }

  async navigateToContacts() {
    await this.contactsTab.click();
  }

  async clickCreateContact() {
    await this.createContactLink.click();
    await expect(this.createLabel).toBeVisible({ timeout: 240000 });
  }

  async clickImportContact() {
    await this.importContactLink.click();
  }

  async clickViewContact() {
    await this.viewContactLink.click();
  }

  async verifyImportContactPage() {
    await expect(this.importLabel).toBeVisible({ timeout: 240000 });
  }

  async verifyContactsPage() {
    await expect(this.contactsLabel).toBeVisible({ timeout: 240000 });
  }

  async enterContactName(contactName) {
    await this.contactName.fill(contactName);
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async verifyContactCreated(expectedResult) {
    await expect(this.successMessage.getByText(expectedResult)).toBeVisible({ timeout: 240000 });
  }
}

module.exports = { ContactPage };