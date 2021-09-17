const {expect} = require('@playwright/test');

exports.BasePage = class BasePage {
  constructor(page) {
    if (new.target === BasePage) {
      throw new TypeError('Cannot construct abstract instances directly');
    };
    this.page = page;
  }

  async navigateToHomePage() {
    await this.page.goto('/');
  }

  async click(el) {
    await this.page.locator(el).click();
  }

  async toHaveText(el, text) {
    await expect(this.page.locator(el)).toHaveText(text);
  }

  async findElements(el) {
    const elements = await this.page.$$(el);
    return elements;
  }

  async findElement(el) {
    const element = await item.$(el);
    return element;
  }

  async elementToBeVisible(el) {
    await expect(this.page.locator(el)).toBeVisible();
  }

  async elementToBeEmpty(el) {
    await expect(this.page.locator(el)).toBeEmpty();
  }

  async getElementValue(el) {
    const value = await this.page.locator(el).getAttribute('value');
    return value;
  }

  async fill(el, text) {
    await this.page.fill(el, text);
  }

  async type(el, text) {
    await this.page.locator(el).type(text);
  }

  async toHaveTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }

  async waitForSelector(el) {
    await this.page.waitForSelector(el);
  }
};
