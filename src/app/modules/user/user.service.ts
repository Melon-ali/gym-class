import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { ENUM_USER_ROLE } from '../../enums/user';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import User from './user.model';
import { Admin } from '../admin/admin.model';
import Trainer from '../trainer/trainer.model';
import Trainees from '../trainee/trainees.model';
// import { User, Admin, Trainer, Trainee } from './models'; // Assuming you have defined these models

const createAdmin = async (
  adminData: any, // Define the appropriate type for adminData
  userData: any, // Define the appropriate type for userData
): Promise<{ message: string }> => {
  const session = await User.startSession(); // Start a session for transaction

  session.startTransaction();
  try {
    userData.role = ENUM_USER_ROLE.ADMIN;

    if (!userData.password) {
      userData.password = config.default_admin_pass as string;
    }

    userData.password = await hashPassword(userData.password);

    const userCreation = await User.create([userData], { session });
    if (!userCreation) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    const adminCreation = await Admin.create([{
      ...adminData,
      userId: userCreation[0]._id, // Use the user ID for the admin
    }], { session });

    if (!adminCreation) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }

    await session.commitTransaction(); // Commit the transaction
    return { message: 'Admin created successfully' };
  } catch (error) {
    await session.abortTransaction(); // Abort the transaction on error
    throw error;
  } finally {
    session.endSession(); // End the session
  }
};

const getOne = async (id: string): Promise<any | null> => {
  const result = await User.findById(id).populate('admin').populate('trainee').populate('trainer');
  return result;
};

const createTrainer = async (
  trainerData: any, // Define the appropriate type for trainerData
  userData: any, // Define the appropriate type for userData
): Promise<{ message: string }> => {
  const session = await User.startSession(); // Start a session for transaction

  session.startTransaction();
  try {
    userData.role = ENUM_USER_ROLE.TRAINER;

    if (!userData.password) {
      userData.password = config.default_trainer_pass as string;
    }

    userData.password = await hashPassword(userData.password);

    const userCreation = await User.create([userData], { session });
    if (!userCreation) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    const trainerCreation = await Trainer.create([{
      ...trainerData,
      userId: userCreation[0]._id, // Use the user ID for the trainer
    }], { session });

    if (!trainerCreation) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Trainer');
    }

    await session.commitTransaction(); // Commit the transaction
    return { message: 'Trainer created successfully' };
  } catch (error) {
    await session.abortTransaction(); // Abort the transaction on error
    throw error;
  } finally {
    session.endSession(); // End the session
  }
};

const createTrainee = async (
  traineeData: any, // Define the appropriate type for traineeData
  userData: any, // Define the appropriate type for userData
): Promise<{ message: string }> => {
  const session = await User.startSession(); // Start a session for transaction

  session.startTransaction();
  try {
    userData.role = ENUM_USER_ROLE.TRAINEE;

    if (!userData.password) {
      userData.password = config.default_trainee_pass as string;
    }

    userData.password = await hashPassword(userData.password);

    const userCreation = await User.create([userData], { session });
    if (!userCreation) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }

    traineeData.userId = userCreation[0]._id;

    const traineeCreation = await Trainees.create([traineeData], { session });

    if (!traineeCreation) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Trainee');
    }

    await session.commitTransaction(); // Commit the transaction
    return { message: 'Trainee created successfully' };
  } catch (error) {
    await session.abortTransaction(); // Abort the transaction on error
    throw error;
  } finally {
    session.endSession(); // End the session
  }
};

const getMe = async (
  user: JwtPayload | null,
): Promise<any | null> => {
  if (!user?.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not authenticated');
  }

  // Fetch the user along with their roles
  const isUserExist = await User.findById(user.id)
    .populate('admin')
    .populate('trainer')
    .populate('trainee');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  let result;

  // Return the respective role details based on the user's role
  if (isUserExist.role === ENUM_USER_ROLE.ADMIN && isUserExist.admin) {
    result = await Admin.findById(isUserExist.admin._id);
  } else if (
    isUserExist.role === ENUM_USER_ROLE.TRAINER &&
    isUserExist.trainer
  ) {
    result = await Trainer.findById(isUserExist.trainer._id);
  } else if (
    isUserExist.role === ENUM_USER_ROLE.TRAINEE &&
    isUserExist.trainee
  ) {
    result = await Trainer.findById(isUserExist.trainee._id);
  } else {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'User role not recognized or role data missing',
    );
  }

  return result;
};

const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config?.bycrypt_salt_rounds!),
  );
  return hashedPassword;
};

export const UserService = {
  createAdmin,
  createTrainer,
  createTrainee,
  getOne,
  getMe,
};
