import { Router } from "express";
import { AlunoController } from "../controllers/index.js";
import { authorization } from "../middlewares/index.js";
const router = Router();

router.post('/create', AlunoController.create);
router.get('/list/:id',authorization, AlunoController.list);
router.get('/getOne/:id', AlunoController.listOne);
router.patch('/update/:id', AlunoController.update);
router.put("/status/:id",AlunoController.status);

export default router;