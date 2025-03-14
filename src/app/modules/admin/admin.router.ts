import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidator } from './admin.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';

const router = express.Router();

// Protect routes with admin authentication
router.use(auth(ENUM_USER_ROLE.ADMIN));

// Route to get all admins
router.route(`/`).get(AdminController.getAll);

// Routes for specific admin by ID
router
  .route(`/:id`)
  .get(AdminController.getOne) // Get a single admin by ID
  .patch(
    validateRequest(AdminValidator.updateAdminZodSchema), // Validate update admin schema
    AdminController.updateOne // Update a specific admin
  )
  .delete(AdminController.deleteOne); // Delete a specific admin

export const AdminRouter = router;
