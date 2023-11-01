import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config()

// cria um token usando os dados do objeto e a chave armazenada na variável de ambiente JWT_SECRET
export const generateToken = async (obj) => jwt.sign(obj, process.env.JWT_SECRET );

