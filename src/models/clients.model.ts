import { model, Schema, type Document } from "mongoose";
import { ActionStatus, CustomerType } from "../utils/enum";

export interface IClients extends Document {
  contact: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  installations: {
    title: string;
    description: string;
    status: ActionStatus;
    requestedDay: Date;
  }[];
  enable: boolean;
  customerType: CustomerType;
}

const clientsSchema = new Schema<IClients>(
  {
    contact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
    installations: {
      type: [
        {
          title: { type: String, required: true },
          description: { type: String },
          status: {
            type: String,
            enum: ActionStatus,
            required: true,
            default: ActionStatus.PENDING,
          },
          requestedDay: { type: Date, required: true },
        },
      ],
      default: [], //Is going to assign the installations in task module
    },

    enable: { type: Boolean, default: true },
    customerType: {
      type: String,
      enum: CustomerType,
      required: true,
    },
  },
  { timestamps: true }
);

const Clients = model<IClients>("Clients", clientsSchema);

export default Clients;
