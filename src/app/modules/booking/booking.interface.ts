import { Types } from 'mongoose';

// Defines the structure for filtering booking queries
export type IBookingFilterRequest = {
  searchTerm?: string;
  name?: string;
};

import { ObjectId } from 'mongoose';

export type IBooking = {
  _id?: Types.ObjectId | string // Optional, since Mongoose will auto-generate this
  __v: number;
  scheduleId: ObjectId | string;
  traineeId: ObjectId | string;
  isCancelled: boolean;
  // other properties of IBooking
}

