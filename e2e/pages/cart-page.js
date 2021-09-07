const {expect} = require('@playwright/test');

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
  }

  async checkItemInCart(item) {
    await expect(this.page.locator('.inventory_item_name')).toHaveText(item);
  }
};
