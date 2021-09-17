const {BasePage} = require('./base-page');
const {CartPage} = require('./cart-page');

exports.ProductsPage = class ProductsPage extends BasePage {
  constructor(page) {
    super(page);

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
    await this.elementToBeVisible(this.productsList);
  }

  async openCart() {
    await this.click(this.basket);
    const cartPage = new CartPage(this.page);
    return cartPage;
  }

  async getProducts() {
    const products = {};
    await this.waitForSelector(this.inventoryContainer);
    const inventoryItems = await this.findElements(this.inventoryItem);
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
    await this.click(products[randomProductName].add);
    return randomProductName;
  }

  async getItemPrice(item, products) {
    const itemPrice = await products[item].price;
    return itemPrice;
  }

  async logout() {
    await this.click(this.burgerButton);
    await this.click(this.logoutButton);
  }
};
