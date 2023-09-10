import { Router } from "express";
import { TurmaController } from "../controllers/index.js";
const router = Router();

router.post('/create', TurmaController.create);
router.get('/list', TurmaController.list);
router.get('/get/:id', TurmaController.getTurma);
router.put('/update/:id', TurmaController.update);
router.delete('/delete/:id', TurmaController.delete);


export default router;