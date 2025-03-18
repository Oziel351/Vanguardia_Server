import type { Request, Response } from "express";
import Clients from "../models/clients.model";
import { validateClient } from "../helpers/client.helper";

const createClient = async (req: Request, res: Response) => {
  try {
    console.log("body", req.body);
    const { error, value } = validateClient(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const client = new Clients(value);
    await client.save();
    return res.status(201).json({ data: client, message: "Cliente creado" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getClients = async (res: Response) => {
  try {
    const clients = await Clients.find();
    return res
      .status(200)
      .json({ data: clients, message: "Clientes encontrados" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const updateClient = async (req: Request, res: Response) => {
  try {
    const { error, value } = validateClient(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const client = await Clients.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    if (!client)
      return res.status(404).json({ message: "Cliente no encontrado" });
    return res
      .status(200)
      .json({ data: client, message: "Cliente actualizado" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const disableClient = async (req: Request, res: Response) => {
  try {
    const client = await Clients.findByIdAndUpdate(
      req.params.id,
      { enable: false },
      { new: true }
    );
    if (!client)
      return res.status(404).json({ message: "Cliente no encontrado" });
    return res
      .status(200)
      .json({ data: client, message: "Cliente deshabilitado" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const enableClient = async (req: Request, res: Response) => {
  try {
    const client = await Clients.findByIdAndUpdate(
      req.params.id,
      { enable: true },
      { new: true }
    );
    if (!client)
      return res.status(404).json({ message: "Cliente no encontrado" });
    return res
      .status(200)
      .json({ data: client, message: "Cliente habilitado" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const deleteClient = async (req: Request, res: Response) => {
  try {
    const { deleteKey } = req.body;
    if (deleteKey !== process.env.KEY_DELETE)
      return res.status(401).json({ message: "Clave incorrecta" });

    const client = await Clients.findByIdAndDelete(req.params.id);
    if (!client)
      return res.status(404).json({ message: "Cliente no encontrado" });
    return res.status(200).json({ data: client, message: "Cliente eliminado" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export {
  createClient,
  getClients,
  updateClient,
  disableClient,
  enableClient,
  deleteClient,
};
