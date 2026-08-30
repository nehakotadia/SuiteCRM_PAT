const { createBdd } = require('playwright-bdd');
const { readExcel } = require('../../utils/excelReader.js');
const { ContactPage } = require('../../pages/ContactsPage.js');
const logger = require('../../utils/logger.js');

const { Given, When, Then } = createBdd();
const contactData = readExcel('Contacts');

Given('the user navigates to the Contacts tab', async ({ page }) => {
  logger.info('Step: navigate to Contacts tab');
  const contactPage = new ContactPage(page);
  await contactPage.navigateToContacts();
});

Given('the user clicks the Create contact button', async ({ page }) => {
  logger.info('Step: open Create Contact form');
  const contactPage = new ContactPage(page);
  await contactPage.clickCreateContact();
});

When('the user clicks Save button after entering valid information in mandatory fields', async ({ page }) => {
  logger.info('Step: save a valid contact');
  const data = contactData.find(row => row.TestCase === 'TC001');
  const contactPage = new ContactPage(page);
  await contactPage.enterContactName(data.LastName);
  await contactPage.clickSave();
});

Then('the contact should be created successfully', async ({ page }) => {
  logger.info('Step: verify contact creation success');
  const contactPage = new ContactPage(page);
  await contactPage.verifyContactCreated(contactData.find(row => row.TestCase === 'TC001').ExpectedResult);
});