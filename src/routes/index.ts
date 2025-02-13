import { Router } from "express";
import AuthRouter from "../routes/auth.route";
import PostRouter from "../routes/post.route";

const router = Router();

router.use("/auth", AuthRouter);

router.use("/post", PostRouter);

export default router;
