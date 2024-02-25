// Libraries
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import logger from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";

// Config
import { __dirname } from "./utils.js";
import {connectDB} from "./config/config.js";
import { initializePassport } from "./config/passport.config.js";

// Router
import appRouter from "./routes/index.routes.js";

const app = express();

connectDB();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser());

// Init passport
initializePassport();
app.use(passport.initialize());

// Init handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Init Routers
app.use("/api", appRouter);

// Dont found the page
app.get("*", (req, res) => {
  res.send("not found");
});

// Create server on port 8080
const httpServer = app.listen(8080, () => {
  console.log("Listening port 8080");
});

// Create webSocket
export const io = new Server(httpServer);

// Sockets
//chatSocket();
