import httpStatus from 'http-status';
import {
  ScheduleRelationalFields,
  ScheduleRelationalFieldsMapper,
  ScheduleSearchableFields,
} from './schedule.constant';
import ApiError from '../../errors/ApiError';
import { IGenericResponse } from '../../interface/common';
import Schedules from './schedule.model';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { SearchingFilteringHelper } from '../../helpers/searchFilterHelper';
import { IPaginationOptions } from '../../interface/pagination';
import { ISchedule, IScheduleFilterRequest } from './schedule.interface';

const createOne = async (data: ISchedule): Promise<ISchedule> => {
  const startOfDay = new Date(data.startTime);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(data.startTime);
  endOfDay.setHours(23, 59, 59, 999);

  // Check if there are already 5 schedules for the same day
  const scheduleCount = await Schedules.countDocuments({
    startTime: { $gte: startOfDay, $lte: endOfDay },
  });

  if (scheduleCount >= 5) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Only 5 Class Schedules are allowed per day.`
    );
  }

  const result = await Schedules.create(data);

  return result.toObject() as ISchedule; // ✅ Explicitly convert to plain object
};


const getAll = async (
  filters: IScheduleFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<ISchedule[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  // Searching and filtering
  const andConditions = SearchingFilteringHelper.searchingFiltering({
    filters,
    searchAbleFields: ScheduleSearchableFields,
    relationalFields: ScheduleRelationalFields,
    relationalFieldsMapper: ScheduleRelationalFieldsMapper,
  });

  const query = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Schedules.find(query)
    .skip(skip)
    .limit(limit)
    // .populate('bookings') // Populate bookings field if necessary
    .lean()
    .then((schedules) => schedules as ISchedule[]); // Explicitly cast the array

  const total = await Schedules.countDocuments(query);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};


const getOne = async (id: string): Promise<ISchedule | null> => {
  const result = await Schedules.findById(id)
  // .populate('bookings')
  .lean();

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Schedule not found');
  }

  return result as ISchedule; // Explicitly asserting the type
};


const updateOne = async (
  id: string,
  payload: Partial<ISchedule>
): Promise<ISchedule> => {
  const isExists = await getOne(id);

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Schedule not found');
  }

  const result = await Schedules.findByIdAndUpdate(id, payload, { new: true }).lean();

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to update schedule, schedule not found');
  }

  return result as ISchedule; // Explicitly asserting the type
};


const deleteOne = async (id: string): Promise<ISchedule> => {
  const isExists = await getOne(id);

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Schedule not found');
  }

  const result = await Schedules.findByIdAndDelete(id).lean();

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete schedule, schedule not found');
  }

  return result as ISchedule; // Ensure TypeScript knows the result is of type ISchedule
};


export const ScheduleService = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
};
