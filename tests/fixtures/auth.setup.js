require('dotenv/config');
const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage.js');
const logger = require('../utils/logger.js');

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    logger.info('Starting SuiteCRM authentication setup');

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        process.env.SUITECRM_USERNAME,
        process.env.SUITECRM_PASSWORD
    );

    await expect(page.getByRole('link', { class: 'home-nav-link' })).toBeVisible();
    logger.info('Authentication successful; saving browser storage state');
    //await expect(page).not.toHaveURL(/login/);

    await page.context().storageState({
        path: authFile
    });
});