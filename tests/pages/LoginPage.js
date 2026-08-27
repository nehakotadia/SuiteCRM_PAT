import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;

        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });
    }

    async goto() {
        await this.page.goto(process.env.BASE_URL);
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async verifyDashboard() {
        await expect(this.page.getByRole('link', { class: 'home-nav-link' })).toBeVisible();
    }   
}