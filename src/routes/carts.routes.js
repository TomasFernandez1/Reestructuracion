import RouterClass from "./router.js";
import CartsController from "../controllers/carts.controller.js";

const {
  addProductToCart,
  deleteAllProductsCart,
  deleteProductCart,
  getCart,
  getCarts,
  updateCart,
  updateQuantityProductCart,
} = new CartsController();

export default class cartRouter extends RouterClass {
  init() {
    // Init service
    // Cart view
    this.get("/:cid", ["USER", "ADMIN"], getCart);

    // Carts view
    this.get("/", ["ADMIN"], getCarts);

    // Add a product to a cart
    this.post("/:cid/products/:pid", ["USER", "ADMIN"], addProductToCart);

    // Update cart
    this.put("/carts/:cid", ["USER", "ADMIN"], updateCart);

    // Update quantity of a product in the cart
    this.put("/carts/:cid/products/:pid", ["USER", "ADMIN"], updateQuantityProductCart);

    // Delete a product from the cart
    this.delete("/carts/:cid/products/:pid", ["USER", "ADMIN"], deleteProductCart);

    // Delete all the products from the carts
    this.delete("/carts/:cid", ["USER", "ADMIN"], deleteAllProductsCart);
  }
}
