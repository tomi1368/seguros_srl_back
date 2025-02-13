import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    console.log(JSON.stringify(req.cookies.token), req.cookies.token, "token");
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
