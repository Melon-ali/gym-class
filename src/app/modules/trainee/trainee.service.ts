import httpStatus from 'http-status';
import {
  TraineeRelationalFields,
  TraineeRelationalFieldsMapper,
  TraineeSearchableFields,
} from './trainee.constant';
import ITrainee, { ITraineeFilterRequest } from './trainee.interface';
import { IPaginationOptions } from '../../interface/pagination';
import { paginationHelpers } from '../../helpers/paginationHelper';
import Trainees from './trainees.model';
import ApiError from '../../errors/ApiError';

// Function to get all trainees with pagination and filtering
const getAll = async (
  filters: ITraineeFilterRequest,
  options: IPaginationOptions,
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: any[] = [];

  // Handling search term
  if (searchTerm) {
    andConditions.push({
      $or: TraineeSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i', // case-insensitive search
        },
      })),
    });
  }

  // Handling filters
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      $and: Object.keys(filterData).map(key => {
        if (TraineeRelationalFields.includes(key)) {
          return {
            [TraineeRelationalFieldsMapper[key]]: (filterData as any)[key],
          };
        } else {
          return {
            [key]: (filterData as any)[key],
          };
        }
      }),
    });
  }

  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

  // Fetching trainees from the database
  const result = await Trainees.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: -1 });

  const total = await Trainees.countDocuments(whereConditions);

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// Function to get a single trainee by ID
const getOne = async (id: string) => {
  const result = await Trainees.findById(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trainee not found');
  }

  return result;
};

// Function to update a trainee by ID
const updateOne = async (
  id: string,
  TraineeData: Partial<ITrainee>,
) => {
  const isExist = await Trainees.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Trainee not found');
  }

  // Updating the trainee
  const result = await Trainees.findByIdAndUpdate(id, TraineeData, { new: true });

  return result;
};

// Function to delete a trainee by ID
const deleteOne = async (id: string) => {
  const isExist = await Trainees.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Trainee not found');
  }

  const result = await Trainees.findByIdAndDelete(id);

  // Log the result for debugging
  console.log(result);

  return isExist;
};

export const TraineeService = { getOne, getAll, updateOne, deleteOne };
