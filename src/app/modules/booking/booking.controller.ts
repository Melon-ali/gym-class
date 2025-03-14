import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BookingFilterableFields } from './booking.constant';
import { BookingService } from './booking.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import pick from '../../utils/pick';

const createOne = catchAsync(async (req, res) => {
  // Assuming BookingService is using Mongoose to create a new booking document
  const result = await BookingService.createOne(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED, // Changed to CREATED for successful creation
    success: true,
    message: 'Booking created successfully!',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  // Picking filters and options (e.g., limit, page, sort) from query parameters
  const filters = pick(req.query, BookingFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BookingService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings fetched successfully!',
    data: result.data,
    // You can include meta data like pagination info if needed
    // meta: result.meta,
  });
});

const getOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.getOne(id); // Using the Mongoose model to fetch a booking by ID
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully',
    data: result,
  });
});

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.updateOne(id, req.body); // Assuming updateOne uses Mongoose's findByIdAndUpdate
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.deleteOne(id); // Using Mongoose's findByIdAndDelete to remove a booking
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
};
