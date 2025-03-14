import { Types } from 'mongoose';

export type IScheduleFilterRequest = {
  searchTerm?: string;
  name?: string;
};

export type ISchedule = {
  _id?: Types.ObjectId;
  title: string;
  startTime: Date;
  endTime: Date;
  trainerId: Types.ObjectId;
  maxTrainees: number;
  bookings?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default ISchedule;
