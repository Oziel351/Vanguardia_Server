import { Router } from "express";
import { mixFetch } from "../controllers/tasks.controller";

const mixRouter = Router();

mixRouter.get("/retrieve", mixFetch as any);

export default mixRouter;
