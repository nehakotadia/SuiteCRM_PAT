const { createBdd } = require('playwright-bdd');
const { readExcel } = require('../../utils/excelReader.js');
const { ContactPage } = require('../../pages/ContactsPage.js');

const { Given, When, Then } = createBdd();
const contactData = readExcel('Contacts');

Given('the user navigates to the Contacts tab', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.navigateToContacts();
});

Given('the user clicks the Create contact button', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.clickCreateContact();
});

When('the user clicks Save button after entering valid information in mandatory fields', async ({ page }) => {
  const data = contactData.find(row => row.TestCase === 'TC001');
  const contactPage = new ContactPage(page);
  await contactPage.enterContactName(data.LastName);
  await contactPage.clickSave();
});

Then('the contact should be created successfully', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.verifyContactCreated(contactData.find(row => row.TestCase === 'TC001').ExpectedResult);
});