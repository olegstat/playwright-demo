const {test} = require('@playwright/test');
const {LoginPage} = require('../pages/login-page');

test.describe.serial('Login page:', () => {
  let page;
  let loginPage;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
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
    const productsPage = await loginPage.clickLogin();
    await productsPage.productsToBeVisible();
  });
});


