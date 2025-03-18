import { model, Schema, type Document } from "mongoose";
import { ActionStatus, TaskType } from "../utils/enum";

export interface ITasks extends Document {
  title: string;
  client: Schema.Types.ObjectId;
  technician: Schema.Types.ObjectId;
  taskType: TaskType;
  scheduleDate: Date;
  notes?: string;
  status: ActionStatus;
}

const tasksSchema = new Schema<ITasks>(
  {
    title: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: "Clients", required: true },
    technician: {
      type: Schema.Types.ObjectId,
      ref: "Technisians",
      required: true,
    },
    taskType: { type: String, enum: TaskType, required: true },
    scheduleDate: { type: Date, required: true },
    notes: { type: String, required: false, default: "" },
    status: {
      type: String,
      enum: ActionStatus,
      required: true,
      default: ActionStatus.PENDING,
    },
  },
  { timestamps: true }
);

const Tasks = model<ITasks>("Tasks", tasksSchema);

export default Tasks;
