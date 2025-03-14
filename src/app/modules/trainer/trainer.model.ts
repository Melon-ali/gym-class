import mongoose from 'mongoose';

const TrainerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required.'],
      unique: true,
    },
    specialization: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Trainer = mongoose.model('Trainer', TrainerSchema);

export default Trainer;