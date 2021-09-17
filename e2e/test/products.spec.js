const {test} = require('@playwright/test');
const {LoginPage} = require('../pages/login-page');
const {ProductsPage} = require('../pages/products-page');

test.describe.serial('Products page:', () => {
  let page;
  let productsPage;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await new LoginPage(page).normalLogin();
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
    const cartPage = await productsPage.openCart();
    await cartPage.checkItemInCart(randomItem);
  });
});
