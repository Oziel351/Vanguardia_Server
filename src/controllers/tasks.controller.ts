import type { Request, Response } from "express";
import { validateTask } from "../helpers/task.helper";
import Tasks from "../models/tasks.model";
import Clients from "../models/clients.model";
import Technician from "../models/technisians.model";

const assignTasks = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateTask(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const task = new Tasks(value);
    await task.save();

    await Clients.findByIdAndUpdate(
      value.client,
      {
        $push: {
          installations: task.installations,
        },
      },
      { new: true }
    );

    await Technician.findByIdAndUpdate(
      value.technician,
      {
        $push: {
          assignedTasks: task.installations,
        },
      },
      { new: true }
    );

    return res.status(201).json({ data: task, message: "Tarea creada" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Tasks.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: tasks, message: "Tareas encontradas" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateTask(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const task = await Tasks.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    return res.status(200).json({ data: task, message: "Tarea actualizada" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const mixFetch = async (req: Request, res: Response) => {
  try {
    const clients = await Clients.find();
    const technicians = await Technician.find();
    const countClients = await Clients.countDocuments();
    const countTechnicians = await Technician.countDocuments();

    if (!clients || !technicians) {
      return res.status(404).json({ message: "Datos no encontrados" });
    }
    return res.status(200).json({
      data: { clients, technicians, countClients, countTechnicians },
      message: "Datos encontrados",
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export { assignTasks, getTasks, updateTask, mixFetch };
