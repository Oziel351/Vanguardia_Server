import Joi from "joi";
import { ActionStatus, TaskType } from "../utils/enum";
import type { ITasks } from "../models/tasks.model";

const taskSchema = Joi.object({
  title: Joi.string().required(),
  client: Joi.string().required(),
  technician: Joi.string().required(),
  taskType: Joi.string()
    .valid(...Object.values(TaskType))
    .required(),
  scheduleDate: Joi.date().required(),
  notes: Joi.string().allow("").optional(),
  status: Joi.string()
    .valid(...Object.values(ActionStatus))
    .required(),
});

export const validateTask = (task: ITasks) => {
  return taskSchema.validate(task);
};
