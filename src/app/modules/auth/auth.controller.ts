import httpStatus from 'http-status';
import { ILoginResponse } from './auth.interface';
import { AuthService } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';

// Login controller
const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  // Set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', result.refreshToken, cookieOptions);
  const { refreshToken, ...others } = result;

  sendResponse<ILoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: others,
  });
});

// Refresh token controller
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // Set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token generated a new access token',
    data: result,
  });
});

// Change password controller
const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const passwordData = req.body;
  const result = await AuthService.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed',
    data: result,
  });
});

export const AuthController = {
  login,
  refreshToken,
  changePassword,
};
