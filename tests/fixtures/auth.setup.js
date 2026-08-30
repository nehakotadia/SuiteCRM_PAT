require('dotenv/config');
const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        process.env.SUITECRM_USERNAME,
        process.env.SUITECRM_PASSWORD
    );

    await expect(page.getByRole('link', { class: 'home-nav-link' })).toBeVisible();
    //await expect(page).not.toHaveURL(/login/);

    await page.context().storageState({
        path: authFile
    });
});