import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';

const router = express.Router();

// POST and GET routes for bookings
router
  .route(`/`)
  .post(
    auth(ENUM_USER_ROLE.TRAINEE), // Ensuring only TRAINEE role can access this route
    validateRequest(BookingValidation.create), // Validate the request body with the booking validation schema
    BookingController.createOne, // Create a new booking
  )
  .get(BookingController.getAll); // Get all bookings

// GET, PATCH, and DELETE routes for a specific booking
router
  .route(`/:id`)
  .get(BookingController.getOne) // Get a specific booking by ID
  .patch(
    auth(ENUM_USER_ROLE.TRAINEE), // Ensure only TRAINEE role can update a booking
    validateRequest(BookingValidation.update), // Validate the request body for update
    BookingController.updateOne, // Update a booking by ID
  )
  .delete(BookingController.deleteOne); // Delete a booking by ID

export const BookingRouter = router;
