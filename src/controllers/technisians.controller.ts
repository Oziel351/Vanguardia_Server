import type { NextFunction, Request, Response } from "express";
import { validateTechnician } from "../helpers/technisian.helper";
import Technician from "../models/technisians.model";

const createTechnician = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateTechnician(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const technisian = new Technician(value);
    await technisian.save();

    return res
      .status(201)
      .json({ data: technisian, message: "Tecnico creado" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const updateTechnician = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateTechnician(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const technisian = await Technician.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true,
      }
    );

    if (!technisian) {
      return res.status(404).json({ message: "Tecnico no encontrado" });
    }

    return res
      .status(200)
      .json({ data: technisian, message: "Tecnico actualizado" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getTechnicians = async (res: Response) => {
  try {
    const technisians = await Technician.find();
    return res
      .status(200)
      .json({ data: technisians, message: "Tecnicos encontrados" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const disableTechnician = async (req: Request, res: Response) => {
  try {
    const technisian = await Technician.findByIdAndUpdate(
      req.params.id,
      { enable: false },
      { new: true }
    );

    if (!technisian) {
      return res.status(404).json({ message: "Tecnico no encontrado" });
    }

    return res
      .status(200)
      .json({ data: technisian, message: "Tecnico deshabilitado" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const enableTechnician = async (req: Request, res: Response) => {
  try {
    const technisian = await Technician.findByIdAndUpdate(
      req.params.id,
      { enable: true },
      { new: true }
    );

    if (!technisian) {
      return res.status(404).json({ message: "Tecnico no encontrado" });
    }

    return res
      .status(200)
      .json({ data: technisian, message: "Tecnico habilitado" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const deleteTechnician = async (req: Request, res: Response) => {
  try {
    const { keyDelete } = req.body;

    if (!keyDelete || keyDelete !== process.env.KEY_DELETE) {
      return res
        .status(400)
        .json({ message: "Clave de eliminacion incorrecta" });
    }

    const technisian = await Technician.findByIdAndDelete(req.params.id);
    if (!technisian) {
      return res.status(404).json({ message: "Tecnico no encontrado" });
    }
    return res.status(200).json({ message: "Tecnico eliminado" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export {
  createTechnician,
  updateTechnician,
  getTechnicians,
  disableTechnician,
  enableTechnician,
  deleteTechnician,
};
