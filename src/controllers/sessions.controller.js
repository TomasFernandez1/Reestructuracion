import { generateToken } from "../utils.js";
import config from "../config/config.js";

export class SessionController {
  constructor() {}

  login = async (req, res) => {
    try {
      const token = generateToken(req.user);
      res.cookie("cookieToken", token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        }).redirect("/api/products");
    } catch (error) {
      res.sendServerError(error?.message)
    }
  };

  register = async (req, res) => {
    res.redirect("/api/view/login");
  };

  recoveryPassword = async (req, res) => {
    res.redirect("/api/view/login");
  };

  logout = async (req, res) => {
    res.clearCookie("cookieToken");
    res.redirect("/api/view/login");
  };

  current = async (req, res) => {
    res.render("current", { req });
  };
}
