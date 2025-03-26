import { model, Schema, type Document } from "mongoose";
import { ActionStatus } from "../utils/enum";

export interface ITechnicians extends Document {
  name: string;
  phone: string;
  assignedTasks: [
    {
      type: Schema.Types.ObjectId;
      ref: "Tasks";
      status: ActionStatus;
    }
  ];
  onTask?: boolean;
  enable?: boolean;
  zone?: string;
}

const techniciansSchema = new Schema<ITechnicians>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    assignedTasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tasks",
        status: {
          type: String,
          enum: ActionStatus,
          required: true,
          default: ActionStatus.PENDING,
        },
      },
    ],
    onTask: { type: Boolean, default: false },
    enable: { type: Boolean, default: true },
    zone: { type: String, required: true },
  },
  { timestamps: true }
);

const Technician = model<ITechnicians>("Technician", techniciansSchema);

export default Technician;
