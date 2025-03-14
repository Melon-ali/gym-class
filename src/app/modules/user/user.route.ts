import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
const router = express.Router();


router.route(`/create-admin`).post(
  // auth(
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  validateRequest(UserValidation.adminCreationZodSchema),
  UserController.createAdmin,
);


router.route(`/create-trainer`).post(
  auth(
    ENUM_USER_ROLE.ADMIN,
  ),
  validateRequest(UserValidation.trainerCreationZodSchema),
  UserController.createTrainer,
);


router.route(`/create-trainee`).post(
  validateRequest(UserValidation.traineeCreationZodSchema),
  UserController.createTrainee,
);

  
router
  .route(`/get-me`)
  .post(
    auth(
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.TRAINER,
      ENUM_USER_ROLE.TRAINEE
    ),
    UserController.getMe,
  );

router.route(`/:id`).get(UserController.getOne);

export const UserRouter = router;
