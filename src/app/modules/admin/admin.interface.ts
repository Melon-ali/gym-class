export type IAdminFilterRequest = {
  searchTerm?: string;
};

import mongoose from 'mongoose';

export type IAdmin = {
  _id?: mongoose.Types.ObjectId; // Optional because MongoDB auto-generates it
  userId: mongoose.Types.ObjectId;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

