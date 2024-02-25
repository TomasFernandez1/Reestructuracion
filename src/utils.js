import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import config from './config/config.js'

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = password =>  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (password, userPassword) => bcrypt.compareSync(password, userPassword);

export const generateToken = user => jwt.sign(user, config.tokenKey,{expiresIn: '1d'})
