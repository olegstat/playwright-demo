const {expect} = require('@playwright/test');
const {HOME_PAGE_TITLE, USERNAME, PASSWORD} = require('../test-data');
const {
  login,
  password,
  loginButton,
  errorMessage,
} = require('../locators/login');

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(HOME_PAGE_TITLE);
  }

  async loginFieldToBeVisible() {
    await expect(this.page.locator(login)).toBeVisible();
  }

  async typeUsername() {
    await this.page.locator(login).type(USERNAME);
  }

  async passwordFieldToBeVisible() {
    await expect(this.page.locator(password)).toBeVisible();
  }

  async typePassword() {
    await this.page.locator(password).type(PASSWORD);
  }

  async loginButtonToBeVisible() {
    await expect(this.page.locator(loginButton)).toBeVisible();
  }

  async clickLogin() {
    await this.page.locator(loginButton).click();
  }

  async loginInputToBeEmpty() {
    await expect(this.page.locator(login)).toBeEmpty();
  }

  async passwordInputToBeEmpty() {
    await expect(this.page.locator(password)).toBeEmpty();
  }

  async errorMessageToBeVisible() {
    await expect(this.page.locator(errorMessage)).toBeVisible();
    await expect(this.page.locator(errorMessage)).toHaveText();
  }

  async login() {
    await this.goto();
    await this.typeUsername();
    await this.typePassword();
    await this.clickLogin();
  }
};
