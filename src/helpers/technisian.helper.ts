import Joi from "joi";
import { ActionStatus } from "../utils/enum";

const technicianSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
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
});

export const validateTechnician = (technician: any) => {
  return technicianSchema.validate(technician);
};
