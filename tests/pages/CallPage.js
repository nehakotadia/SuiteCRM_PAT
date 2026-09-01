const { expect } = require('@playwright/test');

class CallsPage {
 constructor(page) {
  this.page = page;
this.moreLink= page.locator('a').filter({ hasText: 'More', exact: true });
this.callsLink= page.locator('a.nav-link.action-link', { hasText: 'Calls' });
this.verifyCallPageLocator= page.getByText('CALLS', { exact: true });

this.callsTabLocator= page.locator('a').nth(1);
this.logCallLocator= page.getByRole('link', { name: 'Log Call' });
this.verifyCallCreatePageLocator= page.locator('iframe').contentFrame().getByText('CREATE', { exact: true });

this.viewCallsLink = page.getByRole('link', { name: 'View Calls', exact: true });
this.verifyListViewLocator = page.getByText('CALLS', { exact: true });

this.importCallsLocator = page.getByRole('link', { name: 'Import Calls', exact: true });
this.importWizardLocator = page.locator('iframe').contentFrame().getByRole('heading', { name: 'Step 1: Upload Import File', exact: true });

this.requiredFieldError = page.locator('iframe').contentFrame().getByText('Missing required field: subject');
this.subjectField = page.locator('iframe').contentFrame().locator('#name');
//this.saveButton = page.locator('iframe').contentFrame().locator('#SAVE_HEADER');
this.saveButton = page.locator('iframe').contentFrame().getByRole('button', { name: 'Save' , description: 'Save [Alt+a]' });
this.createAnInvite = page.locator('iframe').contentFrame().getByRole('heading', { name: 'Create an invitee' });
this.verifyCallCreatePageLocator = page.locator('iframe').contentFrame().getByText('CREATE', { exact: true });

this.actionsButton = page.locator('iframe').contentFrame().getByRole('link', { name: 'ACTIONS' })
this.duplicateButton = page.locator('iframe').contentFrame().getByRole('button', { name: 'Duplicate' });
}

// SCENARIO 1 - Create a new Call record

async navigateToMoremenu() {
  await this.moreLink.click();
}
async clickCalls() {
  await this.callsLink.click();
  await expect(this.verifyCallPageLocator).toBeVisible({ timeout: 240000 });
}
async callsTab() {
  await this.callsTabLocator.click();
}
async logCall() {
  await this.logCallLocator.click();
}
async verifyCallCreatePage() {
  await expect(this.verifyCallCreatePageLocator).toBeVisible({ timeout: 240000 });
}

// SCENARIO 2 - VIEW CALLS

async clickViewCalls() {
  await this.viewCallsLink.click();
  await expect(this.viewCallsLink).toBeVisible({ timeout: 240000 });
}
async verifyListView() {
  await expect(this.verifyListViewLocator).toBeVisible({ timeout: 240000 });
}

// SCENARIO 3 - IMPORT CALLS

async clickImportCalls() {
  await this.importCallsLocator.waitFor({ state: 'visible', timeout: 240000 });
  await this.importCallsLocator.click();
}
async verifyImportWizard() {
  await expect(this.importWizardLocator).toBeVisible({ timeout: 240000 });
}

// SCENARIO 4 - Field Verification
async addSubjectValue(subject) {
  await this.subjectField.fill(subject);
}
async saveCall() {
  await expect(this.saveButton).toBeVisible({ timeout: 30000 });
  await this.saveButton.click();
}
async verifyRequiredFieldError() {
  await expect(this.requiredFieldError).toBeVisible({ timeout: 30000 });
}

// SCENARIO 5 - Create a Duplicate Call Entry
async waitForCreateAnInvite() {
  await expect(this.createAnInvite).toBeVisible({ timeout: 30000 });
}
async verifyCallSaved() {
  await expect(this.subjectField.getByText('Test Duplicate Call')).toBeVisible({ timeout: 30000 });
}

async clickActions() {
  await expect(this.actionsButton).toBeVisible({timeout: 60000 });
  await this.actionsButton.click();
}
async clickDuplicate() {
  await expect(this.duplicateButton).toBeVisible({ timeout: 30000 });
  await this.duplicateButton.click();
}
async saveDuplicate() {
  await expect(this.saveButton).toBeVisible({ timeout: 30000 });
  await this.saveButton.click(); 
}
}
module.exports = { CallsPage };
