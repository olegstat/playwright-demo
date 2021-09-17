
const {BasePage} = require('./base-page');

exports.SuccessPage = class SuccessPage extends BasePage {
  constructor(page) {
    super(page);

    this.completeHeader = '.complete-header';
    this.goBackButton = '#back-to-products';
  }

  async succcessPageToBeVisible() {
    await this.elementToBeVisible(this.completeHeader);
  }

  async goBackToProducts() {
    await this.click(this.goBackButton);
  }
};
