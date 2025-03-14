import httpStatus from 'http-status';
import { TraineeFilterableFields } from './trainee.constant';
import { TraineeService } from './trainee.service';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import { paginationFields } from '../../constants/pagination';
import sendResponse from '../../utils/sendResponse';

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, TraineeFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await TraineeService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `All Trainees found`,
    data: result?.data,
    // meta: result?.meta,  // Uncomment if you're returning pagination meta info
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await TraineeService.getOne(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainee found`,
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await TraineeService.updateOne(req.params.id, data);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainee updated`,
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await TraineeService.deleteOne(req.params.id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainee deleted`,
    data: result,
  });
});

export const TraineeController = { getOne, getAll, updateOne, deleteOne };
