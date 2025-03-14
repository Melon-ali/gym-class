import { Types } from 'mongoose';

export type ITraineeFilterRequest = {
  searchTerm?: string;
};

type ITrainee = {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  bio?: string | null;
  address?: string | null;
  bookings?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default ITrainee;
