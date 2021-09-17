const {BasePage} = require('./base-page');
const {CheckoutInfoPage} = require('./checkout-info-page');

exports.CartPage = class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.itemName = '.inventory_item_name';
    this.itemPrice = '.inventory_item_price';
    this.itemCartContainer = '.cart_item';
    this.continueShoppingButton = '#continue_shopping';
    this.checkoutButton = '#checkout';
    this.removeButton = (item) => `//div[contains(text(),
    '${item}')]/ancestor::div[contains(@class, 'cart_item_label')]/div/button`;
  }

  async checkItemInCart(item) {
    await this.toHaveText(this.itemName, item);
  }

  async continueShopping() {
    await this.click(this.continueShoppingButton);
  }

  async removeItem(item) {
    await this.click(this.removeButton(item));
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
    const checkoutInfoPage = new CheckoutInfoPage(this.page);
    return checkoutInfoPage;
  }

  async calculateSubtotal() {
    const priceList = [];
    const priceSelectors = await this.findElements(this.itemPrice);
    for (const selector of priceSelectors) {
      let priceEntry = await selector.textContent();
      priceEntry = await priceEntry.split('$')[1];
      priceList.push(parseFloat(priceEntry));
    }
    const subtotal = priceList.reduce((partialSum, a) => partialSum + a, 0);
    return `${subtotal}`;
  }
};
