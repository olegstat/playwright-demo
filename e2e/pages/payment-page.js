const {expect} = require('@playwright/test');
const {PAYMENT_INFO, SHIPPING_INFO} = require('../test-data');

exports.PaymentPage = class PaymentPage {
  constructor(page) {
    this.page = page;

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
    await expect(this.page.locator(this.summaryInfoContainer)).toBeVisible();
  };

  async paymentToBeVisible() {
    await expect(this.page.locator(this.paymentInfo())).toBeVisible();
  }

  async shippingToBeVisible() {
    await expect(this.page.locator(this.shippingInfo())).toBeVisible();
  }

  async verifySubtotal(subtotal) {
    await expect(this.page.locator(this.summarySubtotalLabel))
        .toHaveText(`Item total: $${subtotal}`);
  }

  async calculateTax(subtotal) {
    const tax = (Math.round(((subtotal * 0.08) + Number.EPSILON) * 100)/100)
        .toFixed(2);
    return tax;
  }
  async verifyTax(subtotal) {
    const tax = await this.calculateTax(subtotal);
    await expect(this.page.locator(this.summaryTaxLabel))
        .toHaveText(`Tax: $${tax}`);
  }

  async verifyGrandTotal(subtotal) {
    const tax = await this.calculateTax(subtotal);
    const grandTotal = (parseFloat(tax)+parseFloat(subtotal)).toFixed(2);
    await expect(this.page.locator(this.summaryTotalLabel))
        .toHaveText(`Total: $${grandTotal}`);
  }

  async finishPayment() {
    await this.page.locator(this.finishButton).click();
  }
};
