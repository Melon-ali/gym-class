import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ScheduleFilterableFields } from './schedule.constant';
import { ScheduleService } from './schedules.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import pick from '../../utils/pick';

const createOne = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.createOne(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,  // Changed to 201 for created resource
    success: true,
    message: 'Schedule created successfully!',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ScheduleFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await ScheduleService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedules fetched successfully!',
    data: result.data,
  });
});

const getOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleService.getOne(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule fetched successfully',
    data: result,
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleService.updateOne(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule updated successfully',
    data: result,
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ScheduleService.deleteOne(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Schedule deleted successfully',
    data: result,
  });
});

export const ScheduleController = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
};
