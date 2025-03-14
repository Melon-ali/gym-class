import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required.'],
      unique: true,
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required.'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required.'],
    },
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trainer',
      required: [true, 'Trainer ID is required.'],
    },
    maxTrainees: {
      type: Number,
      required: true,
      min: [1, 'Max trainees must be greater than 0.'],
      max: [100, 'Max trainees cannot exceed 100.'],
      default: 10,
    },
    bookings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    }],
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model('Schedule', ScheduleSchema);

export default Schedule;
