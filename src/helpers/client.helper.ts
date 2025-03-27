import Joi from "joi";
import type { IClients } from "../models/clients.model";
import { ActionStatus, CustomerType } from "../utils/enum";

/* Esto define como se espera que llegue la informacion del cliente, 
y si no llega de esa manera, se envia un mensaje de error. */
const clientSchema = Joi.object({
  contact: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
  }),
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
    .default([]),
  enable: Joi.boolean().required(),
  customerType: Joi.string()
    .valid(...Object.values(CustomerType))
    .required(),
});

export const validateClient = (client: IClients) => {
  return clientSchema.validate(client);
};
