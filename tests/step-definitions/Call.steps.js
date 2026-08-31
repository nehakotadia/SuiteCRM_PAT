const { createBdd } = require('playwright-bdd');
const { expect } = require('@playwright/test');
const { CallsPage } = require('../pages/CallPage');
const logger = require('../utils/logger.js');
const { Given, When, Then } = createBdd();

// BACKGROUND

Given('the user navigates to dashboard for call Feature', async ({ page }) => {
   // await page.goto('https://suite8demo.suiteondemand.com/');
    logger.info('SuiteCRM dashboard opened');
});

// SCENARIO 1 - CREATE a new Call record

Given('the user is on the SuiteCRM dashboard matrix interface', async ({ page }) => {
    page.callsPage = new CallsPage(page);
});

When('the user opens the action link "Log Call" in the sidebar navigation', async ({ page }) => {
    await page.callsPage.navigateToMoremenu();
    await page.callsPage.clickCalls();
});

Then('a fresh Call Record form opens successfully in Edit View', async ({ page }) => { 
    await page.callsPage.callsTab();
    await page.callsPage.logCall();
    await page.callsPage.verifyCallCreatePage();
});

// SCENARIO 2 - VIEW CALLS

Given('the user is currently working inside the active execution profile', async ({ page }) => {
    page.callsPage = new CallsPage(page);
});

When('the user opens the action element "View Calls" on the workspace layout', async ({ page }) => {
    await page.callsPage.navigateToMoremenu();
    await page.callsPage.clickCalls();
    await page.callsPage.callsTab(); 
    await page.callsPage.clickViewCalls();    
});

Then('the page updates to the List View with your matching call records', async ({ page }) => {
    await page.callsPage.verifyListView();
});

// SCENARIO 3 - IMPORT CALLS

Given('the user has administrative preparation privileges enabled', async ({ page }) => {
    page.callsPage = new CallsPage(page);
});

When('the user triggers the action element "Import Calls"', async ({ page }) => {
    await page.callsPage.navigateToMoremenu();
    await page.callsPage.clickCalls();
    await page.callsPage.callsTab(); 
    await page.callsPage.clickImportCalls();
});

Then('the Import Calls opens to step one allowing user to map their data', async ({ page }) => {
    await page.callsPage.verifyImportWizard();
    console.log('Import Calls opened');
});

// SCENARIO 4 - Field Verification

Given('a fresh Call Record form opens successfully in Edit View layout', async ({ page }) => {
    page.callsPage = new CallsPage(page);
    await page.callsPage.navigateToMoremenu();
    await page.callsPage.clickCalls();
    await page.callsPage.callsTab();
    await page.callsPage.logCall();
    await page.callsPage.verifyCallCreatePage();
    logger.info('Fresh Call Record form opened');
});

When('the user empty the "Subject" field the primary "Save" form trigger', async ({ page }) => {
   await page.callsPage.clearSubject();
   await page.callsPage.saveCall();
});

Then('the submission fails inline validation error displays "Missing required field"', async ({ page }) => {
    await page.callsPage.verifyRequiredFieldError();
});

// SCENARIO 5 - Create a Duplicate Call Entry

Given('the user is on the Call creation form', async ({ page }) => {
    page.callsPage = new CallsPage(page);
    await page.callsPage.navigateToMoremenu();
    await page.callsPage.clickCalls();
    await page.callsPage.callsTab();
    await page.callsPage.logCall();
    await page.callsPage.verifyCallCreatePage();
    await page.callsPage.createOriginalCall();
});

When('the user triggers the action element "Duplicate"', async ({ page }) => {
   await page.callsPage.clickActions();
   await page.callsPage.clickDuplicate();
   await page.callsPage.saveDuplicate();
});

Then('the duplicate entry is saved successfully', async ({ page }) => {
   await page.callsPage.verifyDuplicateSaved();
});