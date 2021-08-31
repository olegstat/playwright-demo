const { test, expect } = require('@playwright/test');

test('basic test', async ({ page, baseURL }) => {
  await page.goto(baseURL);
});