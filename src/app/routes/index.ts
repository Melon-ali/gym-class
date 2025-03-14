import express from 'express';
import { UserRouter } from '../modules/user/user.route';
import { AdminRouter } from '../modules/admin/admin.router';
import { TrainerRouter } from '../modules/trainer/trainer.router';
import { TraineeRouter } from '../modules/trainee/trainee.router';
import { AuthRouter } from '../modules/auth/auth.router';
import { ScheduleRouter } from '../modules/schedule/schedule.router';
import { BookingRouter } from '../modules/booking/booking.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/admins',
    route: AdminRouter,
  },
  {
    path: '/trainers',
    route: TrainerRouter,
  },
  {
    path: '/trainees',
    route: TraineeRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/schedules',
    route: ScheduleRouter,
  },
  {
    path: '/bookings',
    route: BookingRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;