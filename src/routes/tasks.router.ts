import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controller";

const tasksRouter = Router();

tasksRouter.post("/create", createTask as any);
tasksRouter.get("/retrieve", getTasks as any);
tasksRouter.patch("/update/:id", updateTask as any);
tasksRouter.delete("/delete/:id", deleteTask as any);

export default tasksRouter;
