import { Router } from "express";
import {
  createClient,
  enableClient,
  disableClient,
  updateClient,
  getClients,
  deleteClient,
} from "../controllers/client.controller";

const clientRouter = Router();

clientRouter.post("/create", createClient as any);
clientRouter.patch("/update/:id", updateClient as any);
clientRouter.patch("/disable/:id", disableClient as any);
clientRouter.patch("/enable/:id", enableClient as any);
clientRouter.get("/retrieve", getClients as any);
clientRouter.delete("/delete/:id", deleteClient as any);

export default clientRouter;
