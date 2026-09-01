const { expect } = require('@playwright/test');

class CalendarPage {
  constructor(page) {
    this.page = page;
    this.frame = page.frameLocator('iframe').first();
    this.calendarLink = page.getByText('Calendar', { exact: true }).first();
    this.subjectField = this.frame.locator('input[name="name"], input[name="subject"], input[id*="subject" i]').first();
    this.saveButton = this.frame.getByRole('button', { name: /save/i }).first();
    this.deleteButton = this.frame.getByRole('button', { name: /delete/i }).last();
}
async openCalendar() {
    await expect(this.calendarLink).toBeVisible({ timeout: 15000 });
    await this.calendarLink.click();
    await expect(this.page.locator('iframe').first()).toBeVisible({timeout: 15000});
    await expect(this.frame.locator('body')).toBeVisible({timeout: 15000}); 
}
async selectBlankGrid() {
    const calendarCell = this.frame.locator('[data-date], [role="gridcell"], td, .fc-day, .fc-daygrid-day').first();
    await expect(calendarCell).toBeVisible({ timeout: 15000 });
    await calendarCell.click(); 
    await expect(this.subjectField).toBeVisible({ timeout: 15000 });
}
async saveEvent(subject = 'Business Meeting') {
    this.page.eventSubject = subject;
    await this.subjectField.fill(subject);
    await expect(this.saveButton).toBeVisible({ timeout: 15000 });
    await this.saveButton.click();
}
async expectEventCreated() {
    await expect(this.frame.getByText(this.page.eventSubject, { exact: true }).first()).toBeVisible({ timeout: 15000 });
}
async selectMeetingForDeletion(subject = 'Business Meeting') {
    const event = this.frame.getByText(subject, { exact: true }).first();
    await expect(event).toBeVisible({ timeout: 15000 });
    await event.click();
}
async clickDelete() {
    await expect(this.deleteButton).toBeVisible({ timeout: 15000 });
    await Promise.all([this.page.waitForEvent('dialog').then(async dialog => {
    this.page.deleteConfirmationMessage = dialog.message();
    await dialog.dismiss();
}),
    this.deleteButton.click()]);
}
async expectDeleteConfirmation() {
    expect(this.page.deleteConfirmationMessage).toContain('Are you sure you want to remove the record?');
}
async expectFormStillOpen() {
    await expect(this.subjectField).toBeVisible({ timeout: 15000 });
}
async saveEmptyEvent() {
    await this.saveButton.click();
}
async expectRequiredError() {
    await expect(this.frame.getByText(/Missing required field/i).first()).toBeVisible({ timeout: 15000 });
}
async saveEvent(subject = 'Business Meeting') {
    this.page.eventSubject = subject;
    await this.subjectField.fill(subject);
    await this.saveButton.click();
}
async holdEvent(subject = 'Business Meeting') {
    const event = this.frame.getByText(subject, { exact: true }).first();
    await expect(event).toBeVisible({ timeout: 15000 });
    await event.hover();
}
async dragEventToAnotherDay() {
    const event = this.frame.getByText(this.page.eventSubject || 'Business Meeting', { exact: true }).first();
    const targetDay = this.frame.locator('[data-date], [role="gridcell"]').nth(1);
    await event.dragTo(targetDay);
}
async expectEventMoved() {
    await expect(this.frame.getByText(this.page.eventSubject || 'Business Meeting', {exact: true}).first()).toBeVisible();
 }
}   
module.exports = { CalendarPage };