import httpStatus from 'http-status';
import { UserService } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Create an admin user
const createAdmin = catchAsync(async (req, res) => {
  const { admin, ...adminData } = req.body;

  const result = await UserService.createAdmin(admin, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Admin created successfully`,
    data: result,
  });
});

// Create a trainer user
const createTrainer = catchAsync(async (req, res) => {
  const { trainer, ...trainerData } = req.body;

  const result = await UserService.createTrainer(trainer, trainerData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainer created successfully`,
    data: result,
  });
});

// Create a trainee user
const createTrainee = catchAsync(async (req, res) => {
  const { trainee, ...traineeData } = req.body;

  const result = await UserService.createTrainee(trainee, traineeData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainee created successfully`,
    data: result,
  });
});

// Get a single user by ID
const getOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getOne(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User fetched successfully`,
    data: result,
  });
});

// Get the currently authenticated user (me)
const getMe = catchAsync(async (req, res) => {
  const user = req?.user;  // This assumes user data is available via authentication middleware

  const result = await UserService.getMe(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Found user successfully`,
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createTrainer,
  createTrainee,
  getOne,
  getMe,
};
