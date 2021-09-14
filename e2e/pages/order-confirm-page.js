const {expect} = require('@playwright/test');

exports.SuccessPage = class SuccessPage {
  constructor(page) {
    this.page = page;

    this.completeHeader = '.complete-header';
    this.goBackButton = '#back-to-products';
  }

  async succcessPageToBeVisible() {
    await expect(this.page.locator(this.completeHeader)).toBeVisible();
  }

  async goBackToProducts() {
    await this.page.locator(this.goBackButton).click();
  }
};
