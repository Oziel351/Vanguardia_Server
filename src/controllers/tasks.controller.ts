import type { Request, Response } from "express";
import { validateTask } from "../helpers/task.helper";
import Tasks from "../models/tasks.model";

const createTask = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateTask(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const task = new Tasks(value);
    await task.save();
    return res.status(201).json({ data: task, message: "Tarea creada" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Tasks.find();
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

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { keyDelete } = req.body;
    if (keyDelete !== process.env.KEY_DELETE) {
      return res.status(401).json({ message: "Clave incorrecta" });
    }

    const task = await Tasks.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    return res.status(200).json({ data: task, message: "Tarea eliminada" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export { createTask, getTasks, updateTask, deleteTask };
