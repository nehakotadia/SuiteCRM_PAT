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