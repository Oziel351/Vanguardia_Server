import { Router } from "express";
import { saveRecord } from "../controllers/record.controller";

const recordRouter = Router();

recordRouter.post("/save", saveRecord as any);

export default recordRouter;
