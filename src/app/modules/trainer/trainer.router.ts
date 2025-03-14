import express from 'express';
import { TrainerController } from './trainer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TrainerValidator } from './trainer.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
const router = express.Router();

router.route(`/`).get(auth(ENUM_USER_ROLE.ADMIN), TrainerController.getAll);

router
  .route(`/:id`)
  .get(TrainerController.getOne)
  .patch(
    validateRequest(TrainerValidator.updateTrainerZodSchema),
    auth(ENUM_USER_ROLE.TRAINER),
    TrainerController.updateOne,
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINER), TrainerController.deleteOne);

export const TrainerRouter = router;
