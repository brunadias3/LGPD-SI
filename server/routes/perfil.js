import { Router } from "express";
import { PerfilController } from "../controllers/index.js";
const router = Router();

router.post('/create', PerfilController.create);
router.get('/list', PerfilController.list);
router.get('/getOne/:id', PerfilController.listOne);
router.put('/update/:id', PerfilController.update);
router.delete('/delete/:id', PerfilController.delete);


export default router;