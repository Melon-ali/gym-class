import { z } from 'zod';

// Validation schema for login
const login = z.object({
  body: z.object({
    contactNo: z.string({
      required_error: `Contact number is required`,
    }),
    password: z.string({
      required_error: `User password is required`,
    }),
  }),
});

// Validation schema for refreshing the token
const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: `Refresh token is required`,
    }),
  }),
});

// Validation schema for changing password
const changePassword = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: `Old password is required`,
    }),
    newPassword: z.string({
      required_error: `New password is required`,
    }),
  }),
});

export const AuthValidator = { login, refreshToken, changePassword };
