import { model, Schema, type Document } from "mongoose";
import { ActionStatus } from "../utils/enum";

export interface ITasks extends Document {
  title: string;
  client: Schema.Types.ObjectId;
  technician: Schema.Types.ObjectId;
  installations: {
    title: string;
    description: string;
    status: ActionStatus;
    requestedDay: Date;
  }[];
  notes?: string;
}

const tasksSchema = new Schema<ITasks>(
  {
    title: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: "Clients", required: true },
    technician: {
      type: Schema.Types.ObjectId,
      ref: "Technician",
      required: true,
    },
    installations: [
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
    notes: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

const Tasks = model<ITasks>("Tasks", tasksSchema);

export default Tasks;
