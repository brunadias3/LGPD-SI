import express from "express";
import cors from "cors";
import connection from "./connection/index.js";
import 'dotenv/config';
import routes from "./routes/index.js";
import passport from "passport";
import cookieSession from "cookie-session";
import  "./passport.js"
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 8000;
app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 240 * 600 * 6 * 10000 })
  );
  
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

try {
    connection.authenticate().then(()=>{
        connection.sync()
        console.log('Banco de Dados Conectado.');
    });
    
} catch (error) {
    console.error('Connection error:', error);
}

app.use(
    cors({
      origin: "http://localhost:3001",
      methods: "GET,POST,PUT,DELETE,PATCH",
      credentials: true,
    })
  );

app.use(express.json());

app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`)
);

app.use(routes);