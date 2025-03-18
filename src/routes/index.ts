import { Router } from "express";
import authRouter from "./auth.router";
import clientRouter from "./clients.router";
import technicianRouter from "./technician.router";
import tasksRouter from "./tasks.router";

/* This file is the main file that will manage all the routes of the application.
 It will use the Router class from express to create a new router instance 
 and then use the use method to add the routes to the routerManager. */

const routerManager = Router();

routerManager.use("/auth", authRouter);
routerManager.use("/clients", clientRouter);
routerManager.use("/technicians", technicianRouter);
routerManager.use("/tasks", tasksRouter);

export default routerManager;
