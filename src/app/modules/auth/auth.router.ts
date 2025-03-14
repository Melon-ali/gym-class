import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidator } from './auth.validator';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';

const router = express.Router();

// Route for login
router
  .route(`/login`)
  .post(
    // No validation is being used here, uncomment if validation is needed
    // validateRequest(AuthValidator.login),
    AuthController.login
  );

// Route for refreshing the token
router
  .route(`/refresh-token`)
  .post(
    validateRequest(AuthValidator.refreshToken),
    AuthController.refreshToken
  );

// Route for changing password
router
  .route(`/change-password`)
  .post(
    validateRequest(AuthValidator.changePassword),
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINER, ENUM_USER_ROLE.TRAINEE), // Role-based authorization
    AuthController.changePassword
  );

export const AuthRouter = router;
