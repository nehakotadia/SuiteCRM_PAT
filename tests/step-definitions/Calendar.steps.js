const { createBdd } = require('playwright-bdd');
const { CalendarPage } = require('../pages/CalendarPage');
const logger = require('../utils/logger.js');
const { Given, When, Then } = createBdd();

// BACKGROUND

Given('the user navigates to dashboard for calendar Feature', async ({ page }) => {
    //await page.goto('https://suite8demo.suiteondemand.com/');
    logger.info('SuiteCRM dashboard opened');
});

// SCENARIO 1 - SCHEDULE STANDARD BUSINESS MEETING

Given('the user is on the Calendar view', async ({ page }) => {
    const calendar = new CalendarPage(page);
    await calendar.openCalendar();
});

When('the user selects directly a blank grid to enter the Subject Field', async ({ page }) => {
    const calendar = new CalendarPage(page);
    await calendar.selectBlankGrid();
    await calendar.saveEvent('Business Meeting');
});

Then('the calendar grid event appears with an "Event Created" alert', async ({ page }) => {
    const calendar = new CalendarPage(page);
    await calendar.expectEventCreated();
});

// SCENARIO 2 - CANCEL MEETING DELETION

Given('the user has selected a meeting for deletion', async ({ page }) => {
    const calendar = new CalendarPage(page);
    await calendar.openCalendar();
    await calendar.selectBlankGrid();
    await calendar.saveEvent('Business Meeting');
    await calendar.selectMeetingForDeletion('Business Meeting');
});

When('the user selects the delete action', async ({ page }) => {
    const calendar = new CalendarPage(page);
    await new CalendarPage(page).clickDelete();
});

Then('the error appears "Are you sure you want to remove the record?"', async ({ page }) => {
    await new CalendarPage(page).expectDeleteConfirmation();
});

// SCENARIO 3 - MISSING MANDATORY FIELDS

Given('the user opens a fresh calendar creation form', async ({ page }) => {
    const calendar = new CalendarPage(page);
    await calendar.openCalendar();
    await calendar.selectBlankGrid();
});

When('the user empty the "Subject Field" the primary save form trigger', async ({ page }) => {
    const calendar = new CalendarPage(page);
    await calendar.saveEmptyEvent();
    await calendar.saveButton.click();
});

Then('the form open,shows a validation error highlights the "Missing required field"', async ({ page }) => {
    const calendar = new CalendarPage(page);
    await calendar.expectRequiredError();
});

// SCENARIO 4 - Cross-day drag and drop

Given('the user holds an event node', async ({ page }) => {
    const calendar = new CalendarPage(page);
    await calendar.openCalendar();
    await calendar.selectBlankGrid();
    await calendar.saveEvent('Business Meeting');
    await calendar.holdEvent('Business Meeting');
});

When('the user drags it to the same time slot on another day', async ({ page }) => {
    const calendar = new CalendarPage(page);
    await page.mouse.move(700, 300);
    await page.mouse.up();
});

Then('the event moves to the new time slot', async ({ page }) => {
    const calendar = new CalendarPage(page);
    await calendar.expectEventMoved();
    console.log('Event moved successfully');
});