import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  create,
  deleteOne,
  getAll,
  getOne,
  update,
} from "../controllers/post/post.controller";
import { validateSchema } from "../middlewares/validate-schema.middleware";
import { createPostSchema } from "../controllers/post/validations/create-post.schema";
import { editPostSchema } from "../controllers/post/validations/edit-post.dto";

const postRouter = Router();

postRouter.get("/", authMiddleware, getAll);

postRouter.get("/:id", getOne);

postRouter.post("/", authMiddleware, validateSchema(createPostSchema), create);

postRouter.put("/:id", authMiddleware, validateSchema(editPostSchema), update);

postRouter.delete("/:id", authMiddleware, deleteOne);

export default postRouter;
