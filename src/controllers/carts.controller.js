import cartDao from "../daos/Mongo/cart.dao.js";

export default class cartController {
  constructor() {
    this.service = new cartDao();
  }

  getCart() {
    async (req, res) => {
      try {
        const { cid } = req.params; // ID Cart
        const { products } = await this.service.getCart(cid);
        const productsArray = products.map((product) => {
          return {
            title: product.product.title,
            price: product.product.price,
            quantity: product.quantity,
          };
        });
        res.render("cart", { products: productsArray, req });
      } catch (error) {
        res.sendServerError(error);
      }
    };
  }

  getCarts() {
    async (req, res) => {
      res.status(200).send(await this.service.getCarts());
    };
  }

  addProductToCart() {
    async (req, res) => {
      try {
        const { cid, pid } = req.params;
        const cart = await this.service.getCart(cid);
        const productIndex = cart.products.findIndex(
          (p) => p.product && p.product.id === pid
        );

        if (productIndex !== -1) {
          cart.products[productIndex].quantity += 1;
        } else {
          cart.products.push({ product: pid, quantity: 1 });
        }

        const result = await this.service.updateCart(cid, cart);
        res.sendSuccess(result);
      } catch (error) {
        res.sendServerError(error);
      }
    };
  }

  updateCart() {
    async (req, res) => {
      try {
        const { cid } = req.params;
        const { products } = req.body;
        const cart = await this.service.getCart(cid);
        cart.products = products;
        await this.service.updateCart(cid, cart);
        res.sendSuccess("Cart updated successfully");
      } catch (error) {
        res.sendServerError(error);
      }
    };
  }

  updateQuantityProductCart() {
    async (req, res) => {
      try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const result = await this.service.updateQuantityProductCart(
          cid,
          pid,
          quantity
        );

        res.sendSuccess("The quantity was updated successfully");
      } catch (error) {
        res.sendServerError(error);
      }
    };
  }

  deleteProductCart() {
    async (req, res) => {
      try {
        const { cid, pid } = req.params;
        const result = await this.service.deleteProductCart(cid, pid);
        res.sendSuccess("The product was deleted successfully");
      } catch (error) {
        res.sendServerError(error);
      }
    };
  }

  deleteAllProductsCart() {
    async (req, res) => {
      try {
        const { cid } = req.params;
        const result = await this.service.deleteProductsCart(cid);
        res.status(200).send(result);
      } catch (error) {
        res.sendServerError(error);
      }
    };
  }
}
