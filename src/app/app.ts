import express from "express";
import cors from "cors";
import MainRouter from "../routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api", MainRouter);

export default app;
