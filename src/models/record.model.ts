import { model, Schema, type Document } from "mongoose";
import { ActionStatus } from "../utils/enum";

export interface IRecord extends Document {
  client: Schema.Types.ObjectId;
  technician: Schema.Types.ObjectId;
  date: Date;
  notes?: string;
  details: {
    description: string;
    equipment: {
      nameEquipment: string;
      typeEquipment: "Operativo" | " Reparado" | " Dañado" | "En revisión";
    };
  };
  status: Partial<ActionStatus>;
}

const recordSchema = new Schema<IRecord>({
  client: { type: Schema.Types.ObjectId, ref: "Clients", required: true },
  technician: {
    type: Schema.Types.ObjectId,
    ref: "Technicians",
    required: true,
  },
  date: { type: Date, required: true },
  notes: { type: String, default: "" },
  details: {
    description: { type: String, required: true },
    equipment: {
      nameEquipment: { type: String, required: true },
      typeEquipment: {
        type: String,
        enum: ["Operativo", "Reparado", "Dañado", "En revisión"],
        required: true,
      },
    },
  },
  status: { type: String, required: true },
});

const Record = model<IRecord>("Records", recordSchema);

export default Record;
