import { Router } from "express";
import { UsuarioController } from "../controllers/index.js";
const router = Router();

router.post('/create', UsuarioController.create);
router.get('/list', UsuarioController.list);
router.put('/update/:id', UsuarioController.update);
router.delete('/delete/:id', UsuarioController.delete);


export default router;