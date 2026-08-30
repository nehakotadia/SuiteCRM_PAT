const { createBdd } = require('playwright-bdd');
const { ContactPage } = require('../../pages/ContactsPage.js');
const logger = require('../../utils/logger.js');

const { Given, When, Then } = createBdd();

Given('the user clicks the Contacts tab', async ({ page }) => {
  logger.info('Step: open Contacts tab for import flow');
  const contactPage = new ContactPage(page);
  await contactPage.navigateToContacts();
});

When('the user clicks the Import Contacts button', async ({ page }) => {
  logger.info('Step: click Import Contacts button');
  const contactPage = new ContactPage(page);
  await contactPage.clickImportContact();
});

Then('the Import Contacts page should be displayed', async ({ page }) => {
  logger.info('Step: verify Import Contacts page');
  const contactPage = new ContactPage(page);
  await contactPage.verifyImportContactPage();
});