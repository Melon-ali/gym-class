export type IUserFilterRequest = {
  searchTerm?: string;
};

import { Document } from 'mongoose';
import { IAdmin } from '../admin/admin.model';
import ITrainer from '../trainer/trainer.interface';
import ITrainee from '../trainee/trainee.interface';


type IUser = {
  username: string;
  email: string;
  password: string;
  role: string;
  needsPasswordChange: boolean;
  passwordChangeAt: Date;
  admin?: IAdmin;
  trainer?: ITrainer;
  trainee?: ITrainee;
} & Document

export default IUser
