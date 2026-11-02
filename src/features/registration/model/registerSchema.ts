import { z } from "zod";

interface RegisterValidationMessages {
  required: string;
  emailRule: string;
  passwordMismatch: string;
}

export function createRegisterSchema(messages: RegisterValidationMessages) {
  return z
    .object({
      englishName: z.string().min(1, messages.required),
      nepaliName: z.string().min(1, messages.required),
      contactNumber: z.string().min(1, messages.required),
      email: z
        .string()
        .min(1, messages.required)
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, messages.emailRule),
      password: z.string().min(1, messages.required),
      confirmPassword: z.string().min(1, messages.required),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: messages.passwordMismatch,
      path: ["confirmPassword"],
    });
}

export type RegistrationForm = z.infer<
  ReturnType<typeof createRegisterSchema>
>;
