import { Schema, Document, model } from 'mongoose';

export enum RoleStatus {
  Active = 1,
  Inactive = 0,
}

export interface IRole extends Document {
  name: string;
  description: string;
  status: RoleStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Number, enum: [0, 1], default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

const Role = model<IRole>('Role', RoleSchema);

export default Role;
