import mongoose, {  Schema } from 'mongoose';
import { ENUM_USER_ROLE } from '../../enums/user';
import IUser from './user.interface';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    minlength: 6,
    match: /^[a-zA-Z0-9]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: [
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.TRAINER,
      ENUM_USER_ROLE.TRAINEE,
    ],
    required: true,
  },
  needsPasswordChange: {
    type: Boolean,
    default: false, // or whatever default makes sense
  },
  passwordChangeAt: {
    type: Date, // Define the type as Date
    required: false, // This can be optional if the password hasn't been changed yet
  },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
  trainee: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainee' },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

