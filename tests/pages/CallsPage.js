export class CallsPage {
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
    await this.page.goto('/calls');
  }

  async openCreateCallForm() {
    await this.logCallLink.click();
  }

  async openCallsListView() {
    await this.viewCallsLink.click();
  }

  async openImportWizard() {
    await this.importCallsLink.click();
  }

  // Form actions
  async fillSubject(subject) {
    await this.subjectField.fill(subject);
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async clickDelete() {
    await this.deleteButton.click();
  }

  async clickDuplicate() {
    await this.duplicateButton.click();
  }

  async clickReschedule() {
    await this.rescheduleButton.click();
  }
}
