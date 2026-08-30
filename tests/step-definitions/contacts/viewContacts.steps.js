const { createBdd } = require('playwright-bdd');
const { ContactPage } = require('../../pages/ContactsPage.js');
const logger = require('../../utils/logger.js');

const { Given, When, Then } = createBdd();

Given('View Contact: the user clicks Contacts tab', async ({ page }) => {
  logger.info('Step: open Contacts tab for view flow');
  const contactPage = new ContactPage(page);
  await contactPage.navigateToContacts();
});

When('View Contact: the user clicks View Contact', async ({ page }) => {
  logger.info('Step: click View Contact');
  const contactPage = new ContactPage(page);
  await contactPage.clickViewContact();
});

Then('View Contact: the list of existing contacts should be displayed with the page title "Contacts"', async ({ page }) => {
  logger.info('Step: verify Contacts page listing');
  const contactPage = new ContactPage(page);
  await contactPage.verifyContactsPage();
});