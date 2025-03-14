import httpStatus from 'http-status';
import {
  TrainerRelationalFields,
  TrainerRelationalFieldsMapper,
  TrainerSearchableFields,
} from './trainer.constant';
import ITrainer, { ITrainerFilterRequest } from './trainer.interface';
import { IPaginationOptions } from '../../interface/pagination';
import { paginationHelpers } from '../../helpers/paginationHelper';
import Trainer from './trainer.model';
import ApiError from '../../errors/ApiError';

// Get all trainers with filtering, pagination, and sorting
const getAll = async (
  filters: ITrainerFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData }: ITrainerFilterRequest = filters;


  const query: Record<string, unknown> = {}; // ✅ Ensure query object is properly typed

  // Search functionality
  if (searchTerm) {
    query.$or = TrainerSearchableFields.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' }, // Case insensitive search
    }));
  }

  // Filter functionality
  if (Object.keys(filterData).length > 0) {
    Object.keys(filterData).forEach(key => {
      if (TrainerRelationalFields.includes(key)) {
        query[TrainerRelationalFieldsMapper[key]] = filterData[key]; // For relational fields
      } else {
        query[key] = filterData[key]; // For non-relational fields
      }
    });
  }

  // Perform the query with pagination and sorting
  const result = await Trainer.find(query)
    .skip(skip)
    .limit(limit)
    .sort(
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : { createdAt: -1 } // Default to sorting by creation date
    )
    .lean(); // Use lean for better performance (no Mongoose Document overhead)

  // Get the total number of trainers for pagination
  const total = await Trainer.countDocuments(query);

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};


// Get a specific trainer by ID
const getOne = async (id: string) => {
  const result = await Trainer.findById(id).lean(); // Use lean for raw data (without Mongoose document methods)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trainer not found');
  }
  return result;
};

// Update a trainer by ID
const updateOne = async (id: string, TrainerData: Partial<ITrainer>) => {
  const result = await Trainer.findByIdAndUpdate(id, TrainerData, { new: true }).lean();
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Trainer not found');
  }
  return result;
};

// Delete a trainer by ID
const deleteOne = async (id: string) => {
  const result = await Trainer.findByIdAndDelete(id).lean();
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Trainer not found');
  }
  return result;
};

// Exporting TrainerService for usage in other parts of the application
export const TrainerService = { getOne, getAll, updateOne, deleteOne };
