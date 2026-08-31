const { expect } = require('@playwright/test');

class CallsPage {
 constructor(page) {
  this.page = page;
this.moreLink= page.locator('a').filter({ hasText: 'More' });
//this.callsLink= page.getByRole('link', { name: 'Calls' });
this.callsLink= page.locator('a.nav-link.action-link', { hasText: 'Calls' });
this.verifyCallPageLocator= page.getByText('CALLS', { exact: true });
this.callsTabLocator= page.locator('a').nth(1);
this.logCallLocator= page.getByRole('link', { name: 'Log Call' });
this.verifyCallCreatePageLocator= page.locator('iframe').contentFrame().getByText('CREATE', { exact: true });

this.viewCallsLink = page.getByRole('link', { name: 'View Calls', exact: true });
this.verifylistViewLocator = page.getByText('CALLS', { exact: true });

this.importCallsLocator = page.getByRole('link', { name: 'Import Calls', exact: true });
this.importWizardLocator = page.locator('iframe').contentFrame().getByRole('heading', { name: 'Step 1: Upload Import File', exact: true });
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
  await expect(this.verifylistViewLocator).toBeVisible({ timeout: 240000 });
}

// SCENARIO 3 - IMPORT CALLS

async clickImportCalls() {
  await this.importCallsLocator.waitFor({ state: 'visible', timeout: 240000 });
  await this.importCallsLocator.click();
}
async verifyImportWizard() {
  await expect(this.importWizardLocator).toBeVisible({ timeout: 240000 });
}
}
module.exports = { CallsPage };

/*

  
// SCENARIO 4 - Field Verification


// SCENARIO 5 - Create a Duplicate Call Entry
  
}*/


