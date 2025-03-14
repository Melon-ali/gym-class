import mongoose from 'mongoose';

const TraineeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required.'],
      unique: true,
    },
    bio: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Trainees = mongoose.model('Trainee', TraineeSchema);

export default Trainees;
