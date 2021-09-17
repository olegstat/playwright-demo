const {expect} = require('@playwright/test');
const {
  FIRST_NAME,
  LAST_NAME,
  POSTAL_CODE,
} = require('../test-data');
const {BasePage} = require('./base-page');
const {PaymentPage} = require('./payment-page');

exports.CheckoutInfoPage = class CheckoutInfoPage extends BasePage {
  constructor(page) {
    super(page);

    this.checkoutContainer = '#checkout_info_container';
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalInput = '#postal-code';
    this.continueButton = '#continue';
  }

  async checkoutToBeVisible() {
    await this.elementToBeVisible(this.checkoutContainer);
  }

  async firstNameToHaveText(text) {
    const value = await this.getElementValue(this.firstNameInput);
    await expect(value).toBe(text);
  }

  async lastNameToHaveText(text) {
    const value = await this.getElementValue(this.lastNameInput);
    await expect(value).toBe(text);
  }

  async postalInputToHaveText(text) {
    const value = await this.getElementValue(this.postalInput);
    await expect(value).toBe(text);
  }

  async typeFirstName() {
    await this.fill(this.firstNameInput, FIRST_NAME);
    await this.firstNameToHaveText(FIRST_NAME);
  }

  async typeLastName() {
    await this.fill(this.lastNameInput, LAST_NAME);
    await this.lastNameToHaveText(LAST_NAME);
  }

  async typePostalCode() {
    await this.fill(this.postalInput, POSTAL_CODE);
    await this.postalInputToHaveText(POSTAL_CODE);
  }

  async proceedToPayment() {
    await this.click(this.continueButton);
    const paymentPage = new PaymentPage(this.page);
    return paymentPage;
  }

  async fillInCustomerData() {
    await this.typeFirstName();
    await this.typeLastName();
    await this.typePostalCode();
  }
};
