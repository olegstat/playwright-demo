const {expect} = require('@playwright/test');

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;

    this.itemName = '.inventory_item_name';
    this.itemCartContainer = '.cart_item';
    this.continueShoppingButton = '#continue_shopping';
    this.checkoutButton = '#checkout';
    this.removeButton = (item) => `//div[contains(text(),
    '${item}')]/ancestor::div[contains(@class, 'cart_item_label')]/div/button`;
  }

  async checkItemInCart(item) {
    await expect(this.page.locator(this.itemName)).toHaveText(item);
  }

  async continueShopping() {
    await this.page.locator(this.continueShoppingButton).click();
  }

  async removeItem(item) {
    await this.page.locator(this.removeButton(item)).click();
  }

  async proceedToCheckout() {
    await this.page.locator(this.checkoutButton).click();
  }

  async calculateSubtotal() {
    const priceList = [];
    const priceSelectors = await this.page.$$('.inventory_item_price');
    for (const selector of priceSelectors) {
      let priceEntry = await selector.textContent();
      priceEntry = await priceEntry.split('$')[1];
      priceList.push(parseFloat(priceEntry));
    }
    const subtotal = priceList.reduce((partialSum, a) => partialSum + a, 0);
    return `${subtotal}`;
  }
};
