const {expect} = require('@playwright/test');
const {productsList, basket} = require('../locators/products');

exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  async productsToBeVisible() {
    await expect(this.page.locator(productsList)).toBeVisible();
  }

  async openCart() {
    await this.page.click(basket);
  }

  async getProducts() {
    const products = {};
    await this.page.waitForSelector('.inventory_container');
    const inventoryItems = await this.page.$$('.inventory_item');
    for (const item of inventoryItems) {
      let itemName = await item.$('.inventory_item_name');
      itemName = await itemName.textContent();
      let itemPrice = await item.$('.inventory_item_price');
      itemPrice = await itemPrice.textContent();
      let addItemButtonSelector = await item.$('button');
      addItemButtonSelector = await addItemButtonSelector.getAttribute('id');
      products[itemName] = {
        price: itemPrice,
        add: `//button[@id='${addItemButtonSelector}']`,
      };
    }
    return products;
  }

  async addRandomItem() {
    const products = await this.getProducts();
    const productNames = Object.keys(products);
    const randomProductName = productNames[
        Math.floor(
            Math.random() * productNames.length,
        )
    ];
    await this.page.click(products[randomProductName].add);
    return randomProductName;
  }
};
