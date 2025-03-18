import Joi from "joi";
import type { IRecord } from "../models/record.model";

const recordSchema = Joi.object({
  client: Joi.string().required(),
  technician: Joi.string().required(),
  date: Joi.date().required(),
  notes: Joi.string().allow("").optional(),
  details: Joi.object({
    description: Joi.string().required(),
    equipment: Joi.object({
      nameEquipment: Joi.string().required(),
      typeEquipment: Joi.string()
        .valid("Operativo", "Reparado", "Dañado", "En revisión")
        .required(),
    }).required(),
  }).required(),
  status: Joi.string().required(),
});

export const validateRecord = (record: IRecord) => {
  return recordSchema.validateAsync(record);
};
