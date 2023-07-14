import { Schema, Document ,model} from "mongoose";

export interface IStorageDocument extends Document {
  name: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const StorageSchema = new Schema<IStorageDocument>({
  name: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});


const StorageModel = model<IStorageDocument>("Storage", StorageSchema);

export default StorageModel;
