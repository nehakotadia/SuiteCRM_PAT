export class CalendarPage {
  constructor(page) {
    this.page = page;

    // Elements & Locators
    this.createButton = page.getByRole('button', { name: 'Schedule Meeting' });
    this.subjectField = page.getByLabel('Subject');
    this.startTimeField = page.getByLabel('Start Date & Time');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.cancelDeleteButton = page.getByRole('button', { name: 'Cancel Deletion' });
    
    // Warnings & Error Indicators
    this.errorMessage = page.getByText('This field is required');
    this.conflictWarning = page.getByText('Time slot is already booked');
    this.successToast = page.getByText('Meeting saved successfully');
    
    // Calendar Layout Items
    this.calendarEvent = (title) => page.getByText(title).first();
    this.calendarDaySlot = (dayName) => page.locator(`[data-day="${dayName}"]`).first();
  }

  // Navigation and Setup
  async openCalendarModule() {
    await this.page.goto('/index.php?module=Calendar&action=index');
  }

  async clickScheduleMeeting() {
    await this.createButton.click();
  }

  // Form Interactions
  async fillMeetingDetails(subject, timeString) {
    if (subject) {
      await this.subjectField.fill(subject);
    }
    if (timeString) {
      await this.startTimeField.fill(timeString);
    }
  }

  async saveMeeting() {
    await this.saveButton.click();
  }

  // Deletion Actions
  async clickDelete() {
    await this.deleteButton.click();
  }

  async cancelDeletion() {
    await this.cancelDeleteButton.click();
  }

  // Drag and Drop Action
  async dragEventToDay(eventTitle, targetDay) {
    const event = this.calendarEvent(eventTitle);
    const destination = this.calendarDaySlot(targetDay);
    await event.dragTo(destination);
  }
}
