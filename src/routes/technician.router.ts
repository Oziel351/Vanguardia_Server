import { Router } from "express";
import {
  createTechnician,
  updateTechnician,
  getTechnicians,
  enableTechnician,
  disableTechnician,
  deleteTechnician,
} from "../controllers/technisians.controller";

const technicianRouter = Router();

technicianRouter.post("/create", createTechnician as any);
technicianRouter.patch("/update/:id", updateTechnician as any);
technicianRouter.patch("/disable/:id", disableTechnician as any);
technicianRouter.patch("/enable/:id", enableTechnician as any);
technicianRouter.get("/retrieve", getTechnicians as any);
technicianRouter.delete("/delete/:id", deleteTechnician as any);

export default technicianRouter;
