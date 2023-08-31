import express from "express";
import usuario from "./usuario.js";
import perfil from "./perfil.js";

const routes = express.Router();

routes.use("/user", usuario);
routes.use("/profile",perfil)

routes.use((req, res) => res.status(404).json({ error: "Rota não encontrada" }));

export default routes;