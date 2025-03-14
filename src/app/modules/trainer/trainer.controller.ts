import httpStatus from 'http-status';
import { TrainerFilterableFields } from './trainer.constant';
import { TrainerService } from './trainer.service';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import { paginationFields } from '../../constants/pagination';
import sendResponse from '../../utils/sendResponse';

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, TrainerFilterableFields);  // Picking the filter fields from the query
  const options = pick(req.query, paginationFields);  // Picking pagination options
  const result = await TrainerService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Trainers found',
    data: result?.data,
    // meta: result?.meta, // You can include pagination metadata here if needed
  });
});

const getOne = catchAsync(async (req, res) => {
  const result = await TrainerService.getOne(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer found',
    data: result,
  });
});

const updateOne = catchAsync(async (req, res) => {
  const data = req.body;  // Get the data to be updated from the request body
  const result = await TrainerService.updateOne(req.params.id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer updated',
    data: result,
  });
});

const deleteOne = catchAsync(async (req, res) => {
  const result = await TrainerService.deleteOne(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer deleted',
    data: result,
  });
});

export const TrainerController = { getOne, getAll, updateOne, deleteOne };
