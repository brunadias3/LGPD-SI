import { Router } from "express";
import { ResponsavelController } from "../controllers/index.js";
const router = Router();

router.post('/create', ResponsavelController.create);
router.get('/list', ResponsavelController.list);
router.get('/getOne/:id', ResponsavelController.listOne);
router.patch('/update/:id', ResponsavelController.update);
router.get('/getLog/:id', ResponsavelController.getLog);


export default router;