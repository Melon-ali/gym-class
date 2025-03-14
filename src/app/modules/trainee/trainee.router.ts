import express from 'express';
import { TraineeController } from './trainee.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TraineeValidator } from './trainee.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';

const router = express.Router();

// Route for getting all trainees with admin authentication
router.route(`/`).get(
  auth(ENUM_USER_ROLE.ADMIN),
  TraineeController.getAll
);

// Route for getting, updating, and deleting a trainee by ID
router
  .route(`/:id`)
  .get(TraineeController.getOne)  // Get one trainee by ID
  .patch(
    validateRequest(TraineeValidator.updateTraineeZodSchema),  // Validation middleware
    auth(ENUM_USER_ROLE.TRAINEE),  // Auth middleware for TRAINEE role
    TraineeController.updateOne,  // Update the trainee
  )
  .delete(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.TRAINEE),  // Auth middleware for ADMIN or TRAINEE role
    TraineeController.deleteOne  // Delete the trainee
  );

// Export the router to be used in other parts of the app
export const TraineeRouter = router;
