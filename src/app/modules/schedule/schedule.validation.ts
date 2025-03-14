import { z } from "zod";

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required.',
      invalid_type_error: 'Title must be a valid string.',
    }),
    startTime: z
      .string({
        required_error: 'Start time is required.',
        invalid_type_error: 'Start time must be a valid ISO string.',
      })
      .refine(value => !isNaN(Date.parse(value)), {
        message: 'Start time must be a valid date.',
      }),
    endTime: z
      .string({
        required_error: 'End time is required.',
        invalid_type_error: 'End time must be a valid ISO string.',
      })
      .refine(value => !isNaN(Date.parse(value)), {
        message: 'End time must be a valid date.',
      }),
    trainerId: z.string({
      required_error: 'Trainer ID is required.',
      invalid_type_error: 'Trainer ID must be a valid string.',
    }),
    maxTrainees: z
      .number({
        invalid_type_error: 'Max trainees must be a valid number.',
      })
      .int('Max trainees must be an integer.')
      .positive('Max trainees must be greater than 0.')
      .max(10, 'Max trainees cannot exceed 100.')
      .default(10),
  }),
});


const update = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'Title must be a valid string.',
      })
      .optional(),
    startTime: z
      .string({
        invalid_type_error: 'Start time must be a valid ISO string.',
      })
      .refine(value => !isNaN(Date.parse(value)), {
        message: 'Start time must be a valid date.',
      })
      .optional(),
    endTime: z
      .string({
        invalid_type_error: 'End time must be a valid ISO string.',
      })
      .refine(value => !isNaN(Date.parse(value)), {
        message: 'End time must be a valid date.',
      })
      .optional(),
    trainerId: z
      .string({
        invalid_type_error: 'Trainer ID must be a valid string.',
      })
      .optional(),
    maxTrainees: z
      .number({
        invalid_type_error: 'Max trainees must be a valid number.',
      })
      .int('Max trainees must be an integer.')
      .positive('Max trainees must be greater than 0.')
      .max(100, 'Max trainees cannot exceed 100.')
      .optional(),
  }),
});


export const ScheduleValidation = {
    create,
    update
}