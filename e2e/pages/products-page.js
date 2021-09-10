const {expect} = require('@playwright/test');

exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
  }


  productsList = '.inventory_list';
  basket = '.shopping_cart_link';
  inventoryContainer = '.inventory_container';
  inventoryItem = '.inventory_item';
  inventoryItemName = '.inventory_item_name';
  inventoryItemPrice = '.inventory_item_price';

  async productsToBeVisible() {
    await expect(this.page.locator(this.productsList)).toBeVisible();
  }

  async openCart() {
    await this.page.click(this.basket);
  }

  async getProducts() {
    const products = {};
    await this.page.waitForSelector(this.inventoryContainer);
    const inventoryItems = await this.page.$$(this.inventoryItem);
    for (const item of inventoryItems) {
      let itemName = await item.$(this.inventoryItemName);
      itemName = await itemName.textContent();
      let itemPrice = await item.$(this.inventoryItemPrice);
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

  async getItemPrice(item, products) {
    const itemPrice = await products[item].price;
    return itemPrice;
  }

  async addItemAndGoToCart() {
    const randomItem = await this.addRandomItem();
    await this.openCart();
    return randomItem;
  }
};
