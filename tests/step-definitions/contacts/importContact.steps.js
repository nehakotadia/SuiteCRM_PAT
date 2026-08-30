const { createBdd } = require('playwright-bdd');
const { ContactPage } = require('../../pages/ContactsPage.js');

const { Given, When, Then } = createBdd();

Given('the user clicks the Contacts tab', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.navigateToContacts();
});

When('the user clicks the Import Contacts button', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.clickImportContact();
});

Then('the Import Contacts page should be displayed', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.verifyImportContactPage();
});