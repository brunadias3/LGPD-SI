import { Router } from "express";
import { ResponsavelController } from "../controllers/index.js";
const router = Router();

router.post('/create/:cp', ResponsavelController.create);
router.get('/list', ResponsavelController.list);
router.get('/getOne/:id', ResponsavelController.listOne);
router.patch('/update/:id', ResponsavelController.update);


export default router;