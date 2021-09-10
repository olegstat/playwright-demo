const {test} = require('@playwright/test');
const {LoginPage} = require('../pages/login-page');
const {ProductsPage} = require('../pages/products-page');
const {CartPage} = require('../pages/cart-page');

test.describe.serial('Cart page:', () => {
  let page;
  let productsPage;
  let cartPage;
  let randomItem;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await new LoginPage(page).normalLogin();
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Random added item is displayed in the cart', async () => {
    randomItem = await productsPage.addItemAndGoToCart();
    await cartPage.checkItemInCart(randomItem);
  });

  test('It is possible to remove item', async () => {
    await cartPage.removeItem(randomItem);
  });
});
