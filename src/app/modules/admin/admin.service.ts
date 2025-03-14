import { Admin, IAdmin } from './admin.model';
import { IAdminFilterRequest } from './admin.interface';
import { IPaginationOptions } from '../../interface/pagination';
import { paginationHelpers } from '../../helpers/paginationHelper';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';

// Get all admins with filters and pagination
const getAll = async (
  filters: IAdminFilterRequest,
  options: IPaginationOptions,
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const {
    searchTerm,
    ...filterData
  }: { searchTerm?: string; [key: string]: any } = filters; // Explicit type for destructuring

  const query: Record<string, any> = {}; // Explicit type for the query object

  if (searchTerm) {
    query.$or = [{ location: { $regex: searchTerm, $options: 'i' } }];
  }

  Object.keys(filterData).forEach((key) => {
    query[key] = filterData[key];
  });

  const result = await Admin.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Admin.countDocuments(query);

  return {
    meta: { total, page, limit },
    data: result,
  };
};

// Get one admin by id
const getOne = async (id: string) => {
  return await Admin.findById(id).populate('userId');
};

// Update one admin by id
const updateOne = async (id: string, adminData: Partial<IAdmin>) => {
  const result = await Admin.findByIdAndUpdate(id, adminData, { new: true });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Admin not found`);
  }
  return result;
};

// Delete one admin by id
const deleteOne = async (id: string) => {
  const result = await Admin.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Admin not found`);
  }
  return result;
};

export const AdminService = { getOne, getAll, updateOne, deleteOne };
