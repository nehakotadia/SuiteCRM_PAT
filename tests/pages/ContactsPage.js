const { expect } = require('@playwright/test');
const logger = require('../utils/logger.js');

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
    logger.info('Opening Contacts tab');
    await this.contactsTab.click();
  }

  async clickCreateContact() {
    logger.info('Clicking Create Contact');
    await this.createContactLink.click();
    await expect(this.createLabel).toBeVisible({ timeout: 240000 });
  }

  async clickImportContact() {
    logger.info('Opening Import Contacts page');
    await this.importContactLink.click();
  }

  async clickViewContact() {
    logger.info('Opening View Contacts page');
    await this.viewContactLink.click();
  }

  async verifyImportContactPage() {
    logger.info('Verifying Import Contacts page is visible');
    await expect(this.importLabel).toBeVisible({ timeout: 240000 });
  }

  async verifyContactsPage() {
    logger.info('Verifying Contacts page is visible');
    await expect(this.contactsLabel).toBeVisible({ timeout: 240000 });
  }

  async enterContactName(contactName) {
    logger.info(`Entering contact last name: ${contactName}`);
    await this.contactName.fill(contactName);
  }

  async clickSave() {
    logger.info('Clicking Save button');
    await this.saveButton.click();
  }

  async verifyContactCreated(expectedResult) {
    logger.info(`Checking contact creation result: ${expectedResult}`);
    await expect(this.successMessage.getByText(expectedResult)).toBeVisible({ timeout: 240000 });
  }
}

module.exports = { ContactPage };