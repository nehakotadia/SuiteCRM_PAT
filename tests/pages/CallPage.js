const { expect } = require('@playwright/test');

class CallsPage {
 constructor(page) {
  this.page = page;
this.moreLink= page.locator('a').filter({ hasText: 'More' });
this.callsLink= page.locator('a.nav-link.action-link', { hasText: 'Calls' });
this.verifyCallPageLocator= page.getByText('CALLS', { exact: true });

this.callsTabLocator= page.locator('a').nth(1);
this.logCallLocator= page.getByRole('link', { name: 'Log Call' });
this.verifyCallCreatePageLocator= page.locator('iframe').contentFrame().getByText('CREATE', { exact: true });

this.viewCallsLink = page.getByRole('link', { name: 'View Calls', exact: true });
this.verifyListViewLocator = page.getByText('CALLS', { exact: true });

this.importCallsLocator = page.getByRole('link', { name: 'Import Calls', exact: true });
this.importWizardLocator = page.locator('iframe').contentFrame().getByRole('heading', { name: 'Step 1: Upload Import File', exact: true });

this.callFrame = page.locator('iframe').contentFrame();
this.requiredFieldError = this.page.getByText('Missing required field', { exact: true });
this.subjectField = this.callFrame.locator('#name');
 
this.verifyCallCreatePageLocator = this.callFrame.getByText('CREATE', { exact: true });

this.subjectField = this.callFrame.locator('#name');

this.saveButton = this.callFrame.getByRole('button',{name: 'Save', description: 'Save [Alt+a]'});

this.actionsButton = this.callFrame.getByRole('link', { name: 'ACTIONS' })
this.duplicateButton = this.callFrame.getByRole('button', { name: 'Duplicate' });
this.duplicateSaveButton = this.callFrame.getByRole('button',{name: 'Save', description: 'Save [Alt+a]'});
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
async clearSubject() {
  const frame = this.page.locator('iframe').contentFrame();
  const subject = frame.locator('#name');
  await this.subjectField.waitFor({state: 'visible', timeout: 30000});
  await this.subjectField.fill('');
}
async saveCall() {
  const frame = this.page.locator('iframe').contentFrame();
  const saveButton = frame.getByRole('button', { name: 'Save', description: 'Save [Alt+a]' });
  await this.saveButton.click();
}
async verifyRequiredFieldError() {
  const frame = this.page.locator('iframe').contentFrame();
  const subject = frame.locator('#name');
  await expect(subject).toHaveValue('');
  await expect(frame.getByText('CREATE', { exact: true })).toBeVisible({ timeout: 30000 });
}

// SCENARIO 5 - Create a Duplicate Call Entry
 
async createOriginalCall() {
 const frame = this.page.locator('iframe').contentFrame(); 
 const subject = frame.locator('#name');
 const save = frame.getByRole('button', { name: 'Save', description: 'Save [Alt+a]' });
 await subject.fill('Test Duplicate Call');
 await save.click();
}
async clickActions() {
  const frame = this.page.locator('iframe').contentFrame();
  const actionsButton = frame.getByRole('link', { name: 'ACTIONS' });  
  await expect(actionsButton).toBeVisible({timeout: 60000 });
  await actionsButton.click();
}
async clickDuplicate() {
  const frame = this.page.locator('iframe').contentFrame();
  const duplicateButton = frame.getByRole('button', { name: 'Duplicate' });
  await expect(duplicateButton).toBeVisible({ timeout: 30000 });
  await this.duplicateButton.click();
}
async saveDuplicate() {
  const frame = this.page.locator('iframe').contentFrame();
  const saveButton = frame.getByRole('button',{ name: 'Save', description: 'Save [Alt+a]'});
  await expect(saveButton).toBeVisible({ timeout: 30000 });
  await saveButton.click(); 
}
async verifyDuplicateSaved() {
 const subject = this.callFrame.locator('#name');
 await expect(subject).toHaveValue('Test Duplicate Call',{timeout: 30000 });
 }
}
module.exports = { CallsPage };
