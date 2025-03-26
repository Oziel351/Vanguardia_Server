import Joi from "joi";
import { ActionStatus } from "../utils/enum";
import type { ITasks } from "../models/tasks.model";

const taskSchema = Joi.object<ITasks>({
  title: Joi.string().required(),
  client: Joi.string().required(),
  technician: Joi.string().required(),
  installations: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string()
          .valid(...Object.values(ActionStatus))
          .required(),
        requestedDay: Joi.date().required(),
      })
    )
    .required(),
  notes: Joi.string().allow("").optional(),
});

export const validateTask = (task: ITasks) => {
  return taskSchema.validate(task);
};
