const {test} = require('@playwright/test');
const {CartPage} = require('../pages/cart-page');
const {CheckoutInfoPage} = require('../pages/checkout-info-page');
const {LoginPage} = require('../pages/login-page');
const {ProductsPage} = require('../pages/products-page');
const {PaymentPage} = require('../pages/payment-page');
const {SuccessPage} = require('../pages/order-confirm-page');

test.describe.serial('Purchase flow test:', () => {
  let page;
  let randomItem;
  let subtotal;
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutInfoPage;
  let paymentPage;
  let confirmPage;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutInfoPage = new CheckoutInfoPage(page);
    paymentPage = new PaymentPage(page);
    confirmPage = new SuccessPage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Login page can be opened', async () => {
    await loginPage.goto();
    await loginPage.verifyTitle();
    await loginPage.loginButtonToBeVisible();
    await loginPage.passwordFieldToBeVisible();
    await loginPage.loginFieldToBeVisible();
  });

  test('Login inputs are empty by default', async () => {
    await loginPage.loginInputToBeEmpty();
    await loginPage.passwordInputToBeEmpty();
  });

  test('User can login', async () => {
    await loginPage.typeUsername();
    await loginPage.typePassword();
    await loginPage.clickLogin();
  });

  test('Products are displayed', async () => {
    await productsPage.productsToBeVisible();
  });

  test('User can add a random item to the basket', async () => {
    randomItem = await productsPage.addRandomItem();
    await productsPage.openCart();
  });

  test('Added item is displayed in the cart', async () => {
    await cartPage.checkItemInCart(randomItem);
    subtotal = await cartPage.calculateSubtotal();
  });

  test('User can proceed to checkout customer info page', async () => {
    await cartPage.proceedToCheckout();
  });

  test('Checkout info page is displayed', async () => {
    await checkoutInfoPage.checkoutToBeVisible();
  });

  test('It is possible to fill in the customer data', async () => {
    await checkoutInfoPage.fillInCustomerData();
  });

  test('User can proceed to payment', async () => {
    await checkoutInfoPage.proceedToPayment();
  });

  test('Payment page is displayed', async () => {
    await paymentPage.summaryToBeVisible();
  });

  test('Payment method is displayed', async () => {
    await paymentPage.paymentToBeVisible();
  });

  test('Shipping info is displayed', async () => {
    await paymentPage.shippingToBeVisible();
  });

  test('Totals are correct', async () => {
    await paymentPage.verifySubtotal(subtotal);
    await paymentPage.verifyTax(subtotal);
    await paymentPage.verifyGrandTotal(subtotal);
  });

  test('Purchase can be finished', async () => {
    await paymentPage.finishPayment();
  });

  test('Order confirmation page is displayed', async () => {
    await confirmPage.succcessPageToBeVisible();
  });

  test('It is possible to go back to products list', async () => {
    await confirmPage.goBackToProducts();
    await productsPage.productsToBeVisible();
  });

  test('User can logout', async () => {
    await productsPage.logout();
    await loginPage.verifyTitle();
  });
});
