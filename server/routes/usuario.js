import { Router } from "express";
import { UsuarioController } from "../controllers/index.js";
const router = Router();

router.post('/create', UsuarioController.create);
router.get('/list', UsuarioController.list);
router.patch('/update/:id', UsuarioController.update);

export default router;