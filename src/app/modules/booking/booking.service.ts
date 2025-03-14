import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { ScheduleService } from '../schedule/schedules.service';
import { IBooking, IBookingFilterRequest } from './booking.interface';
import { IGenericResponse } from '../../interface/common';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { SearchingFilteringHelper } from '../../helpers/searchFilterHelper';
import { IPaginationOptions } from '../../interface/pagination';
import Booking from './booking.model';

// Create a booking
const createOne = async (data: IBooking): Promise<IBooking> => {
  const isScheduleExists = await ScheduleService.getOne(data?.scheduleId);
  if (!isScheduleExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Schedule not found');
  }

  const isUserExistsInThisSchedule = await Booking.findOne({
    scheduleId: isScheduleExists._id,
    traineeId: data?.traineeId,
  });

  if (isUserExistsInThisSchedule) {
    throw new ApiError(httpStatus.CONFLICT, "You've already booked the schedule");
  }

  const total = await Booking.countDocuments({
    scheduleId: isScheduleExists._id,
    isCancelled: false,
  });

  if (total >= 10) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Class schedule is full. Maximum 10 trainees allowed per schedule.'
    );
  }

  const result = await Booking.create(data); // Create booking document in MongoDB
  return result.toObject() as IBooking; // ✅ Ensure correct type
};



// Get all bookings with filters and pagination
const getAll = async (
  filters: IBookingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<IBooking[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const filterConditions = SearchingFilteringHelper.searchingFiltering({
    filters,
    searchAbleFields: ['field1', 'field2'],
    relationalFields: ['fieldA', 'fieldB'],
    relationalFieldsMapper: {},
  });

  const query = filterConditions.length > 0 ? { $and: filterConditions } : {};

  const result = await Booking.find(query).skip(skip).limit(limit).lean(); // Use Mongoose query to fetch data
  const total = await Booking.countDocuments(query); // Count the total number of documents matching the query

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get a single booking by ID
const getOne = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findById(id).lean(); // Fetch booking by ID using Mongoose
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  return result;
};

// Update a booking by ID
const updateOne = async (id: string, payload: Partial<IBooking>): Promise<IBooking> => {
  const result = await Booking.findByIdAndUpdate(id, payload, { new: true }); // Update booking using Mongoose
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  return result;
};

// Delete a booking by ID
const deleteOne = async (id: string): Promise<IBooking> => {
  const result = await Booking.findByIdAndDelete(id); // Delete booking by ID using Mongoose
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  return result;
};

export const BookingService = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
};
