import ProductDao from "../daos/Mongo/product.dao.js";

export default class ProductsController {
  constructor() {
    this.service = new ProductDao();
  }
  getProducts = async (req, res) => {
    try {
      const { limit = 10, pageQuery = 1, sort, query } = req.query;
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, page } =
        await this.service.getProducts(limit, pageQuery, sort, query);
      res.render("products", {
        products: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page,
        req,
        cartId: req.user.cart,
      });
    } catch (error) {
      return res.sendServerError(error.message);
    }
  }

  getProduct = async (req, res) => {
    try {
      const { pid } = req.params; // Product ID
      const result = await this.service.getProduct(pid);
      return res.render("product", { result });
    } catch (error) {
      return res.sendServerError(error.message);
    }
  }

  newProduct = async (req, res) => {
    try {
      const newProduct = req.body; // New Product

      const result = await this.service.createProduct(newProduct);
      return res.send(result);
    } catch (error) {
      return res.sendServerError(error.message);
    }
  }

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params; // Product ID
      const updateProduct = req.body; // Updated product
      await this.service.updateProduct(pid, updateProduct);
      res.sendSuccess(`The Product with id ${pid} was successfully updated`);
    } catch (error) {
      return res.sendServerError(error.message);
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params; // Product ID
      await this.service.deleteProduct(pid);
      res.sendSuccess("Product deleted successfully");
    } catch (error) {
      return res.sendServerError(error.message);
    }
  }
}
