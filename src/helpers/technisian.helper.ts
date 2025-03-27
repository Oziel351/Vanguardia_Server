import Joi from "joi";
import { ActionStatus } from "../utils/enum";
import { ITechnicians } from "../models/technisians.model";

const technicianSchema = Joi.object({
  payload: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    assignedTasks: Joi.array().items(
      Joi.object({
        type: Joi.string().required(),
        ref: Joi.string().valid("Tasks").required(),
        status: Joi.string()
          .valid(...Object.values(ActionStatus))
          .required(),
      })
    ),
    onTask: Joi.boolean().default(false),
    enable: Joi.boolean().default(true),
    zone: Joi.string().required(),
  }).unknown(true),
}).unknown(true);

export const validateTechnician = (technician: ITechnicians) => {
  return technicianSchema.validate(technician);
};
