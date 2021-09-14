const {expect} = require('@playwright/test');

exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;

    this.productsList = '.inventory_list';
    this.basket = '.shopping_cart_link';
    this.inventoryContainer = '.inventory_container';
    this.inventoryItem = '.inventory_item';
    this.inventoryItemName = '.inventory_item_name';
    this.inventoryItemPrice = '.inventory_item_price';
    this.burgerButton = '#react-burger-menu-btn';
    this.logoutButton = '#logout_sidebar_link';
  }

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

  async logout() {
    await this.page.locator(this.burgerButton).click();
    await this.page.locator(this.logoutButton).click();
  }
};
