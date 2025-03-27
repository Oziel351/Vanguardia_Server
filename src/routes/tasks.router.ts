import { Router } from "express";
import {
  assignTasks,
  getTasks,
  updateTask,
} from "../controllers/tasks.controller";

const tasksRouter = Router();

tasksRouter.post("/create", assignTasks as any);
tasksRouter.get("/retrieve", getTasks as any);
tasksRouter.patch("/update/:id", updateTask as any);

export default tasksRouter;
