import express from "express";
import usuario from "./usuario.js";
import turma from "./turma.js"
import responsavel from "./responsavel.js";
import aluno from "./aluno.js";
import loginRouter from "./login.js";
import auth from './auth.js'


const routes = express.Router();

routes.use("/user", usuario);
routes.use("/responsible",responsavel);
routes.use("/team", turma);
routes.use("/student", aluno);
routes.use("/login", loginRouter);
routes.use("/auth", auth)
routes.use((req, res) => res.status(404).json({ error: "Rota não encontrada" }));

export default routes;