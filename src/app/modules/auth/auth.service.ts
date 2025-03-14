import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import {
  IChangePassword,
  ILogin,
  ILoginResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import User from '../user/user.model';

const login = async (data: ILogin): Promise<ILoginResponse> => {
  const { email, password } = data;

  // check if user exists
  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `User not found`);
  }

  // match password
  const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `Password is incorrect`);
  }

  // create access token and refresh token
  const accessToken = jwtHelpers.createToken(
    { id: isUserExist._id, email: isUserExist.email, role: isUserExist.role },
    config.jwt.secret as string,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { id: isUserExist._id, email: isUserExist.email, role: isUserExist.role },
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExist.needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as string);
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, `Invalid refresh token`);
  }

  const { email } = verifiedToken;

  // check if user exists in database
  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `User not found`);
  }

  // generate new access token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist._id, email: isUserExist.email, role: isUserExist.role },
    config.jwt.secret as string,
    config.jwt.expires_in as string,
  );

  return { accessToken: newAccessToken };
};

const changePassword = async (
  userData: JwtPayload | null,
  passwordData: IChangePassword,
): Promise<{ message: string }> => {
  const { email } = userData!;
  const { oldPassword, newPassword } = passwordData!;

  // check if user exists
  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `User not found`);
  }

  // check if old password matches
  const isPasswordMatched = await bcrypt.compare(oldPassword, isUserExist.password);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `Old password is incorrect`);
  }

  // hash new password
  const newHashPassword = await bcrypt.hash(newPassword, Number(config.bycrypt_salt_rounds));

  // update password in the database
  isUserExist.password = newHashPassword;
  isUserExist.needsPasswordChange = false;
  isUserExist.passwordChangeAt = new Date();

  await isUserExist.save(); // Save updated user

  return { message: `Password changed successfully` };
};

export const AuthService = {
  login,
  refreshToken,
  changePassword,
};
