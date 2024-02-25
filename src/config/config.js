import dotenv from "dotenv";
import { MongoSingleton } from "../mongoSingleton.js";

// DB connection
export const connectDB = async () => {
  try {
    MongoSingleton.getInstance(
      "mongodb+srv://tomasAdmin:0QyJ3SSkPBqPmLpC@cluster-coderhouse.bg10jwi.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.error(error);
  }
};

dotenv.config()

export default {
  PORT: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  secretSession: process.env.SECRET_SESSION,
  tokenKey: process.env.TOKEN_KEY
}
