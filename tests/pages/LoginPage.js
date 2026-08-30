const { expect } = require('@playwright/test');
const logger = require('../utils/logger.js');

class LoginPage {
    constructor(page) {
        this.page = page;

        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });
    }

    async goto() {
        logger.info(`Opening SuiteCRM login page: ${process.env.BASE_URL}`);
        await this.page.goto(process.env.BASE_URL);        
    }

    async login(username, password) {
        logger.info('Attempting SuiteCRM login');
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async verifyDashboard() {
        logger.info('Verifying dashboard is visible after login');
        await expect(this.page.getByRole('link', { class: 'home-nav-link' })).toBeVisible();
    }   
}

module.exports = { LoginPage };