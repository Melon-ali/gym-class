import mongoose, { Schema, Document } from 'mongoose';

type IBooking = {
  scheduleId: mongoose.Types.ObjectId;
  traineeId: mongoose.Types.ObjectId;
  isCancelled?: boolean;
  createdAt: Date;
  updatedAt: Date;
} & Document

const BookingSchema: Schema = new Schema<IBooking>(
  {
    scheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Schedule',
      required: true,
    },
    traineeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trainee',
      required: true,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // This automatically creates createdAt and updatedAt fields
  }
);

const Booking = mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
