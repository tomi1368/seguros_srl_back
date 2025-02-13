import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const response = schema.safeParse(req.body);
    if (response.success) return next();
    res.status(400).json({ message: response.error });
    return;
  };
