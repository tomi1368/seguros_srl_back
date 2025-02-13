import { Router } from "express";
import { login, register } from "../controllers/auth/auth.controller";
import { validateSchema } from "../middlewares/validate-schema.middleware";
import { loginSchema } from "../controllers/auth/validations/login.schema";
import { registerSchema } from "../controllers/auth/validations/register.schema";

const authRouter = Router();

authRouter.post("/login", validateSchema(loginSchema), login);
authRouter.post("/register", validateSchema(registerSchema), register);

export default authRouter;
