const {PAYMENT_INFO, SHIPPING_INFO} = require('../test-data');
const {BasePage} = require('./base-page');
const {SuccessPage} = require('./order-confirm-page');

exports.PaymentPage = class PaymentPage extends BasePage {
  constructor(page) {
    super(page);

    this.summaryInfoContainer = '.summary_info';
    this.paymentInfo = () => `//div[contains(
      @class, 'summary_value_label'
    ) and text() = '${PAYMENT_INFO}']`;
    this.shippingInfo = () => `//div[contains(
      @class, 'summary_value_label'
    ) and text() = '${SHIPPING_INFO}']`;
    this.summarySubtotalLabel = '.summary_subtotal_label';
    this.summaryTaxLabel = '.summary_tax_label';
    this.summaryTotalLabel = '.summary_total_label';
    this.finishButton = '#finish';
  }

  async summaryToBeVisible() {
    await this.elementToBeVisible(this.summaryInfoContainer);
  };

  async paymentToBeVisible() {
    await this.elementToBeVisible(this.paymentInfo());
  }

  async shippingToBeVisible() {
    await this.elementToBeVisible(this.shippingInfo());
  }

  async verifySubtotal(subtotal) {
    await this.toHaveText(this.summarySubtotalLabel,
        `Item total: $${subtotal}`);
  }

  async calculateTax(subtotal) {
    const tax = (Math.round(((subtotal * 0.08) + Number.EPSILON) * 100)/100)
        .toFixed(2);
    return tax;
  }
  async verifyTax(subtotal) {
    const tax = await this.calculateTax(subtotal);
    await this.toHaveText(this.summaryTaxLabel, `Tax: $${tax}`);
  }

  async verifyGrandTotal(subtotal) {
    const tax = await this.calculateTax(subtotal);
    const grandTotal = (parseFloat(tax)+parseFloat(subtotal)).toFixed(2);
    await this.toHaveText(this.summaryTotalLabel, `Total: $${grandTotal}`);
  }

  async finishPayment() {
    await this.click(this.finishButton);
    const confirmPage = new SuccessPage(this.page);
    return confirmPage;
  }
};
