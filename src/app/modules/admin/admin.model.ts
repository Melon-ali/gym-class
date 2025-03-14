import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  userId: mongoose.Types.ObjectId;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    location: { type: String, required: false },
  },
  { timestamps: true }
);

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);
