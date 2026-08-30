const logger = require('../utils/logger.js');

class CallsPage {
  constructor(page) {
    this.page = page;
    
    // Elements on the page
    this.logCallLink = page.getByRole('link', { name: 'Log Call' });
    this.viewCallsLink = page.getByRole('link', { name: 'View Calls' });
    this.importCallsLink = page.getByRole('link', { name: 'Import Calls' });
    this.subjectField = page.getByLabel('Subject');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.duplicateButton = page.getByRole('button', { name: 'Duplicate' });
    this.rescheduleButton = page.getByRole('button', { name: 'Reschedule' });
  }

  // Navigation actions
  async navigateToCallsModule() {
    logger.info('Opening Calls module');
    await this.page.goto('/calls');
  }

  async openCreateCallForm() {
    logger.info('Opening Log Call form');
    await this.logCallLink.click();
  }

  async openCallsListView() {
    logger.info('Opening Calls list view');
    await this.viewCallsLink.click();
  }

  async openImportWizard() {
    logger.info('Opening Import Calls wizard');
    await this.importCallsLink.click();
  }

  // Form actions
  async fillSubject(subject) {
    logger.info(`Filling call subject: ${subject}`);
    await this.subjectField.fill(subject);
  }

  async clickSave() {
    logger.info('Saving call entry');
    await this.saveButton.click();
  }

  async clickDelete() {
    logger.info('Deleting call record');
    await this.deleteButton.click();
  }

  async clickDuplicate() {
    logger.info('Duplicating call record');
    await this.duplicateButton.click();
  }

  async clickReschedule() {
    logger.info('Rescheduling call');
    await this.rescheduleButton.click();
  }
}

module.exports = { CallsPage };
