const {HOME_PAGE_TITLE, USERNAME, PASSWORD} = require('../test-data');
const {BasePage} = require('./base-page');
const {ProductsPage} = require('./products-page');

exports.LoginPage = class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.login = '#user-name';
    this.password = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '.error-message-container.error';
  }

  async goto() {
    await this.navigateToHomePage();
  }

  async verifyTitle() {
    await this.toHaveTitle(HOME_PAGE_TITLE);
  }

  async loginFieldToBeVisible() {
    await this.elementToBeVisible(this.login);
  }

  async typeUsername() {
    await this.type(this.login, USERNAME);
  }

  async passwordFieldToBeVisible() {
    await this.elementToBeVisible(this.password);
  }

  async typePassword() {
    await this.type(this.password, PASSWORD);
  }

  async loginButtonToBeVisible() {
    await this.elementToBeVisible(this.loginButton);
  }

  async clickLogin() {
    await this.click(this.loginButton);
    const productsPage = new ProductsPage(this.page);
    return productsPage;
  }

  async loginInputToBeEmpty() {
    await this.elementToBeEmpty(this.login);
  }

  async passwordInputToBeEmpty() {
    await this.elementToBeEmpty(this.password);
  }

  async errorMessageToBeVisible(text) {
    await this.elementToBeVisible(this.errorMessage);
    await this.toHaveText(this.errorMessage, text);
  }

  async normalLogin() {
    await this.goto();
    await this.typeUsername();
    await this.typePassword();
    await this.clickLogin();
  }
};
