import { z } from "zod";

const create = z.object({
  body: z.object({
    scheduleId: z.string({
      required_error: 'Schedule ID is required.',
      invalid_type_error: 'Schedule ID must be a valid string.',
    }),
    traineeId: z.string({
      required_error: 'Trainee ID is required.',
      invalid_type_error: 'Trainee ID must be a valid string.',
    }),
    isCancelled: z
      .boolean({
        invalid_type_error: 'isCancelled must be a boolean value.',
      })
      .optional(),
  }),
});

const update = z.object({
  body: z.object({
    scheduleId: z
      .string({
        invalid_type_error: 'Schedule ID must be a valid string.',
      })
      .optional(),
    traineeId: z
      .string({
        invalid_type_error: 'Trainee ID must be a valid string.',
      })
      .optional(),
    isCancelled: z
      .boolean({
        invalid_type_error: 'isCancelled must be a boolean value.',
      })
      .optional(),
  }),
});

export const BookingValidation = {
    create,
    update
}