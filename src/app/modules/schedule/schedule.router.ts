import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ScheduleController } from './schedule.controller';
import { ScheduleValidation } from './schedule.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';

const router = express.Router();

router
  .route(`/`)
  .post(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(ScheduleValidation.create),
    ScheduleController.createOne
  )
  .get(ScheduleController.getAll);

router
  .route(`/:id`)
  .get(ScheduleController.getOne)
  .patch(
    auth(ENUM_USER_ROLE.ADMIN),
    validateRequest(ScheduleValidation.update),
    ScheduleController.updateOne
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN), ScheduleController.deleteOne);

export const ScheduleRouter = router;
