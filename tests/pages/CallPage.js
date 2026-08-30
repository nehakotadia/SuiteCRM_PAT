const { expect } = require('@playwright/test');

class CallsPage {
 constructor(page) {
  this.page = page;
this.moreLink= page.locator('a').filter({ hasText: 'More' });
//this.callsLink= page.getByRole('link', { name: 'Calls' });
this.callsLink= page.locator('a.nav-link.action-link', { hasText: 'Calls' });
this.callsTabLocator= page.locator('a').nth(1);
this.logCallLocator= page.getByRole('link', { name: 'Log Call' });
this.verifyCallCreatePageLocator= page.locator('iframe').contentFrame().getByText('CREATE', { exact: true });


/*this.frame = page.frameLocator('iframe').first();

this.subjectField = this.frame.locator('input[name="name"]').first();

this.saveButton = this.frame.locator('button[name="Save"], ' +'button[title="Save"], ' +'input[type="submit"][value="Save"], ' +
  'input[type="button"][value="Save"], ' +'[data-action="save"]').first();

this.callRecord = this.page.locator('table tbody tr, [data-testid*="call" i], .list-row').first();

this.requiredError = this.frame.getByText(/Missing required field/i).first();*/
}

/*async openCallsMenu() {
  const callsMenu = this.page.getByText('Calls', { exact: true }).first();
  await expect(callsMenu).toBeVisible({ timeout: 30000 });
  await callsMenu.hover();
}*/
  
// SCENARIO 1 - Create a new Call record

 async navigateToMoremenu() {
    await this.moreLink.click();
  }
   async clickCalls() {
    await this.callsLink.click();
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
/*


async openLogCall() {
  await this.openCallsMenu();
  const createCall = this.page.locator('button, a, [role="button"]').filter({ hasText: /create|new call|log call/i }).first();
  await expect(createCall).toBeVisible({ timeout: 15000 });
  await createCall.click();
}
async expectEditView() {
  const editForm = this.page.locator('form, [role="dialog"], input[name="name"], input[name="subject"]').first();
  await expect(editForm).toBeVisible({ timeout: 30000 });
}

// SCENARIO 2 - VIEW CALLS
 
async openViewCalls() {
  await this.openCallsMenu();
  const viewCalls = this.page.getByText('View Calls', { exact: true }).first();
  await expect(viewCalls).toBeVisible({ timeout: 30000 });
  await viewCalls.click();
}
async expectListView() {
  await expect(this.page).toHaveURL(/#\/calls/i);
  await expect(this.page.locator('table').first()).toBeVisible({timeout: 30000});
}

// SCENARIO 3 - IMPORT CALLS

async openImportCalls() {
  await this.page.getByText('Calls', { exact: true }).first().click();
  const importCalls = this.page.getByText('Import Calls', { exact: true }).first();
  await expect(importCalls).toBeVisible({timeout: 30000});
  await importCalls.click();
}
async expectImportCalls() {
  const importCalls = this.page.locator('form, [role="dialog"], .call, .import-calls').first();
  await expect(importCalls).toBeVisible({timeout: 30000});
}
  
// SCENARIO 4 - Field Verification

async clearSubject() {
    await this.subjectField.fill('');
}
async saveCall() {
  await expect(this.saveButton).toBeVisible({ timeout: 15000 });
  await this.saveButton.click();
}
async expectRequiredError() {
  await expect(this.requiredError).toBeVisible({ timeout: 15000 });
}

// SCENARIO 5 - Create a Duplicate Call Entry
  
async openExistingCall() {
  const callLink = this.callRecord.locator('a').first();
  await expect(callLink).toBeVisible({ timeout: 30000 });
  await callLink.click();
}
async clickDuplicate() {
  const duplicate = this.frame.getByText('Duplicate', {exact: true}).first();
  await expect(duplicate).toBeVisible({ timeout: 30000 });
  await duplicate.click();
}
async expectDuplicateSaved() {
  await expect(this.subjectField).toBeVisible({ timeout: 15000 });
 }*/
}
module.exports = { CallsPage };