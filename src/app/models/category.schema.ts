import { Schema, Document, model } from 'mongoose';

export enum CategoryStatus {
  Active = 1,
  Inactive = 0,
}

export interface ICategory extends Document {
  name: string;
  description: string;
  status: CategoryStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Number, enum: [0, 1], default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

const Category = model<ICategory>('Category', CategorySchema);

export default Category;
