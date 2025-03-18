import type { Request, Response } from "express";
import Record from "../models/record.model";
import { validateRecord } from "../helpers/record.helper";

export const saveRecord = async (req: Request, res: Response) => {
  try {
    // Validate the request body against the Joi schema
    await validateRecord(req.body);

    // Create a new record instance
    const record = new Record(req.body);

    // Save the record to the database
    await record.save();

    // Send the saved record as the response
    res.status(201).send(record);
  } catch (error: any) {
    console.log(error);
    res.status(400).send(error.details || error.message);
  }
};
