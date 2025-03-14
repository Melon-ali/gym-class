import httpStatus from 'http-status';
import { AdminFilterableFields } from './admin.constant';
import { AdminService } from './admin.service';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import { paginationFields } from '../../constants/pagination';
import sendResponse from '../../utils/sendResponse';

// Get all admins with filters and pagination
const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, AdminFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await AdminService.getAll(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `All admins found`,
    data: result?.data,
    // meta: result?.meta,
  });
});

// Get one admin by ID
const getOne = catchAsync(async (req, res) => {
  const result = await AdminService.getOne(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Admin found`,
    data: result,
  });
});

// Update one admin by ID
const updateOne = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AdminService.updateOne(req.params.id, data);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Admin updated`,
    data: result,
  });
});

// Delete one admin by ID
const deleteOne = catchAsync(async (req, res) => {
  const result = await AdminService.deleteOne(req.params.id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Admin deleted`,
    data: result,
  });
});

export const AdminController = { getOne, getAll, updateOne, deleteOne };
