export type ITrainerFilterRequest = {
  searchTerm?: string;
  [key: string]: any;
};

import { Types } from 'mongoose';

type ITrainer = {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  specialization?: string | null;
  bio?: string | null;
  address?: string | null;
  schedules?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default ITrainer;

