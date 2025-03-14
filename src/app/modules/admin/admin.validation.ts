// import { z } from 'zod';
// import { gender } from './admin.constant';

// const updateAdminZodSchema = z.object({
//   body: z.object({
//     name: z.string({}).optional(),
//     gender: z.enum([...gender] as [string, ...string[]], {}).optional(),
//     email: z.string().email().optional(),
//     emergencyContactNo: z
//       .string()
//       .min(10).optional(),
//     profileImage: z.string().optional()
//   }),
// });


// export const AdminValidator = { updateAdminZodSchema };

import { z } from 'zod';
import { gender } from './admin.constant';

// Define the validation schema for updating an admin
const updateAdminZodSchema = z.object({
  body: z.object({
    name: z.string().optional(), // Optional name field
    gender: z.enum([...gender] as [string, ...string[]]).optional(), // Optional gender field
    email: z.string().email().optional(), // Optional email field
    emergencyContactNo: z
      .string()
      .min(10, 'Emergency contact number must be at least 10 digits')
      .optional(), // Optional emergency contact number
    profileImage: z.string().optional(), // Optional profile image field
  }),
});

export const AdminValidator = { updateAdminZodSchema };

