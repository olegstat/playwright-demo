const {expect} = require('@playwright/test');
const {HOME_PAGE_TITLE, USERNAME, PASSWORD} = require('../test-data');

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
  }

  login = '#user-name';
  password = '#password';
  loginButton = '#login-button';
  errorMessage = '.error-message-container.error';

  async goto() {
    await this.page.goto('/');
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(HOME_PAGE_TITLE);
  }

  async loginFieldToBeVisible() {
    await expect(this.page.locator(this.login)).toBeVisible();
  }

  async typeUsername() {
    await this.page.locator(this.login).type(USERNAME);
  }

  async passwordFieldToBeVisible() {
    await expect(this.page.locator(this.password)).toBeVisible();
  }

  async typePassword() {
    await this.page.locator(this.password).type(PASSWORD);
  }

  async loginButtonToBeVisible() {
    await expect(this.page.locator(this.loginButton)).toBeVisible();
  }

  async clickLogin() {
    await this.page.locator(this.loginButton).click();
  }

  async loginInputToBeEmpty() {
    await expect(this.page.locator(this.login)).toBeEmpty();
  }

  async passwordInputToBeEmpty() {
    await expect(this.page.locator(this.password)).toBeEmpty();
  }

  async errorMessageToBeVisible() {
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
    await expect(this.page.locator(this.errorMessage)).toHaveText();
  }

  async normalLogin() {
    await this.goto();
    await this.typeUsername();
    await this.typePassword();
    await this.clickLogin();
  }
};
