const {expect} = require('@playwright/test');
const {
  FIRST_NAME,
  LAST_NAME,
  POSTAL_CODE,
} = require('../test-data');
const {PaymentPage} = require('./payment-page');

exports.CheckoutInfoPage = class CheckoutInfoPage {
  constructor(page) {
    this.page = page;

    this.checkoutContainer = '#checkout_info_container';
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalInput = '#postal-code';
    this.continueButton = '#continue';
  }

  async checkoutToBeVisible() {
    await expect(this.page.locator(this.checkoutContainer)).toBeVisible();
  }

  async firstNameToHaveText(text) {
    const value = await this.page.locator(this.firstNameInput)
        .getAttribute('value');
    await expect(value).toBe(text);
  }

  async lastNameToHaveText(text) {
    const value = await this.page.locator(this.lastNameInput)
        .getAttribute('value');
    await expect(value).toBe(text);
  }

  async postalInputToHaveText(text) {
    const value = await this.page.locator(this.postalInput)
        .getAttribute('value');
    await expect(value).toBe(text);
  }

  async typeFirstName() {
    await this.page.fill(this.firstNameInput, FIRST_NAME);
    await this.firstNameToHaveText(FIRST_NAME);
  }

  async typeLastName() {
    await this.page.fill(this.lastNameInput, LAST_NAME);
    await this.lastNameToHaveText(LAST_NAME);
  }

  async typePostalCode() {
    await this.page.fill(this.postalInput, POSTAL_CODE);
    await this.postalInputToHaveText(POSTAL_CODE);
  }

  async proceedToPayment() {
    await this.page.locator(this.continueButton).click();
    const paymentPage = new PaymentPage(this.page);
    return paymentPage;
  }

  async fillInCustomerData() {
    await this.typeFirstName();
    await this.typeLastName();
    await this.typePostalCode();
  }
};
