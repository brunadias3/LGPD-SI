import { Router } from "express";
import { LoginController } from "../controllers/index.js";

const loginRouter = Router();

loginRouter.post("/login", LoginController.login);
loginRouter.get("/checkAuthentication", LoginController.checkAuthentication);
loginRouter.post("/logout", LoginController.logOut);

export default loginRouter;