const { createBdd } = require('playwright-bdd');
const { CallsPage } = require('../pages/CallPage');
const logger = require('../utils/logger.js');
const { Given, When, Then } = createBdd();

// BACKGROUND

Given('the user navigates to dashboard for call Feature', async ({ page }) => {
    logger.info('SuiteCRM dashboard opened');
});

// SCENARIO 1 - CREATE a new Call record

Given('the user is on the SuiteCRM dashboard matrix interface', async ({ page }) => {
    const callsPage = new CallsPage(page);
});

When('the user opens the action link "Log Call" in the sidebar navigation', async ({ page }) => {
    const callsPage = new CallsPage(page);
    await callsPage.navigateToMoremenu();
    await callsPage.clickCalls();
});

Then('a fresh Call Record form opens successfully in Edit View', async ({ page }) => { 
    const callsPage = new CallsPage(page);
    await callsPage.callsTab();
    await callsPage.logCall();
    await callsPage.verifyCallCreatePage();
});

// SCENARIO 2 - VIEW CALLS

Given('the user is currently working inside the active execution profile', async ({ page }) => {
    const callsPage = new CallsPage(page);
});

When('the user opens the action element "View Calls" on the workspace layout', async ({ page }) => {
    const callsPage = new CallsPage(page);
    await callsPage.navigateToMoremenu();
    await callsPage.clickCalls();
    await callsPage.callsTab(); 
    await callsPage.clickViewCalls();    
});

Then('the page updates to the List View with your matching call records', async ({ page }) => {
    const callsPage = new CallsPage(page);
    await callsPage.verifyListView();
});

// SCENARIO 3 - IMPORT CALLS

Given('the user has administrative preparation privileges enabled', async ({ page }) => {
    const callsPage = new CallsPage(page);
});

When('the user triggers the action element "Import Calls"', async ({ page }) => {
    const callsPage = new CallsPage(page);
    await callsPage.navigateToMoremenu();
    await callsPage.clickCalls();
    await callsPage.callsTab(); 
    await callsPage.clickImportCalls();
});

Then('the Import Calls opens to step one allowing user to map their data', async ({ page }) => {
    const callsPage = new CallsPage(page);
    await callsPage.verifyImportWizard();
    logger.info('Import Calls opened');
});

// SCENARIO 4 - Field Verification

Given('a fresh Call Record form opens successfully in Edit View layout', async ({ page }) => {
    const callsPage = new CallsPage(page);
    await callsPage.navigateToMoremenu();
    await callsPage.clickCalls();
    await callsPage.callsTab();
    await callsPage.logCall();
    await callsPage.verifyCallCreatePage();
    logger.info('Fresh Call Record form opened');
});

When('the user empty the "Subject" field the primary "Save" form trigger', async ({ page }) => {
    const callsPage = new CallsPage(page);
   await callsPage.addSubjectValue('');
   logger.info('Subject field cleared');
   await callsPage.saveCall();
   logger.info('Save button clicked');
});

Then('the submission fails inline validation error displays "Missing required field"', async ({ page }) => {
    const callsPage = new CallsPage(page);
    await callsPage.verifyRequiredFieldError();
    logger.info('Required field error displayed');
});

// SCENARIO 5 - Create a Duplicate Call Entry

Given('the user is on the Call creation form', async ({ page }) => {
    const callsPage = new CallsPage(page);
    await callsPage.navigateToMoremenu();
    await callsPage.clickCalls();
    await callsPage.callsTab();
    await callsPage.logCall();
    await callsPage.verifyCallCreatePage();
    await callsPage.addSubjectValue('Test Duplicate Call');    
    logger.info('Subject field filled with "Test Duplicate Call"'); 
    await callsPage.waitForCreateAnInvite();
    logger.info('Create an Invite section loaded');  
    await callsPage.saveCall();
    await callsPage.verifyCallSaved();
});

When('the user triggers the action element "Duplicate"', async ({ page }) => {
   const callsPage = new CallsPage(page);  
   await callsPage.clickActions();
   await callsPage.clickDuplicate();
   await callsPage.saveDuplicate();
});

Then('the duplicate entry is saved successfully', async ({ page }) => {
   const callsPage = new CallsPage(page);
   await callsPage.verifyCallSaved();
});