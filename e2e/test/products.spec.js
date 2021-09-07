const {test} = require('@playwright/test');
const {LoginPage} = require('../pages/login-page');
const {ProductsPage} = require('../pages/products-page');
const {CartPage} = require('../pages/cart-page');

test.describe.serial('Products page:', () => {
  let page;
  let productsPage;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await new LoginPage(page).login();
    productsPage = new ProductsPage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Products are displayed', async () => {
    await productsPage.productsToBeVisible();
  });

  test('User can add a random item to the basket', async () => {
    const randomItem = await productsPage.addRandomItem();
    await productsPage.openCart();
    await new CartPage(page).checkItemInCart(randomItem);
  });
});
