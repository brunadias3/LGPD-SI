import express from "express";
import cors from "cors";
import connection from "./connection/index.js";
import 'dotenv/config';
import routes from "./routes/index.js";

const app = express();

const port = process.env.PORT || 8000;

try {
    connection.authenticate().then(()=>{
        connection.sync()
        console.log('Banco de Dados Conectado.');
    });
    
} catch (error) {
    console.error('Connection error:', error);
}

app.use(cors());

app.use(express.json());

app.listen(port, () =>
    console.log(`Servidor rodando em http://localhost:${port}`)
);

app.use(routes);