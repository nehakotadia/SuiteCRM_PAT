const logger = require('../utils/logger.js');

class CalendarPage {
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
    logger.info('Opening Calendar module');
    await this.page.goto('/index.php?module=Calendar&action=index');
  }

  async clickScheduleMeeting() {
    logger.info('Opening Schedule Meeting dialog');
    await this.createButton.click();
  }

  // Form Interactions
  async fillMeetingDetails(subject, timeString) {
    if (subject) {
      logger.info(`Entering meeting subject: ${subject}`);
      await this.subjectField.fill(subject);
    }
    if (timeString) {
      logger.info(`Setting meeting time: ${timeString}`);
      await this.startTimeField.fill(timeString);
    }
  }

  async saveMeeting() {
    logger.info('Saving meeting details');
    await this.saveButton.click();
  }

  // Deletion Actions
  async clickDelete() {
    logger.info('Deleting calendar event');
    await this.deleteButton.click();
  }

  async cancelDeletion() {
    logger.info('Cancelling event deletion');
    await this.cancelDeleteButton.click();
  }

  // Drag and Drop Action
  async dragEventToDay(eventTitle, targetDay) {
    logger.info(`Dragging event "${eventTitle}" to day ${targetDay}`);
    const event = this.calendarEvent(eventTitle);
    const destination = this.calendarDaySlot(targetDay);
    await event.dragTo(destination);
  }
}

module.exports = { CalendarPage };
