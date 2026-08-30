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
  await page.callsPage.callsTab();
     await page.callsPage.logCall();
     await page.callsPage.verifyCallCreatePage();
});

Then('a fresh Call Record form opens successfully in Edit View', async ({ page }) => {
      


});

