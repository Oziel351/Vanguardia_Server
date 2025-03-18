import { model, Schema, type Document } from "mongoose";
import { ActionStatus, CustomerType } from "../utils/enum";

export interface IClients extends Document {
  name: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  address: string;
  installations: {
    equipment: {
      type: string;
      model?: string;
      serialNumber?: string;
    }[];
    status: ActionStatus;
  };
  maintenance: {
    requestDay: Date;
    description: string;
    status: ActionStatus;
  };
  enable: boolean;
  customerType: CustomerType;
}

const clientsSchema = new Schema<IClients>(
  {
    name: { type: String, required: true },
    contact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    address: { type: String, required: true },
    installations: {
      equipment: [
        {
          type: { type: String, required: true },
          model: { type: String },
          serialNumber: { type: String },
        },
      ],
      status: {
        type: String,
        enum: ActionStatus,
        required: true,
        default: ActionStatus.PENDING,
      },
    },
    maintenance: {
      requestDay: { type: Date, required: true },
      description: { type: String, required: true },
      status: {
        type: String,
        enum: ActionStatus,
        required: true,
        default: ActionStatus.PENDING,
      },
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
