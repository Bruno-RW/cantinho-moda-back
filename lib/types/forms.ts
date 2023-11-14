import { z } from "zod";

export const userFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(5, "Name must have atleast 5 characters")
      .max(70, "Name must be shorter than 70 characters"),

    type: z
      .string()
      .min(1, "Type is required")
      .max(1),

    email: z
      .string()
      .trim()
      .min(1, "E-mail is required")
      .min(10, "E-mail must have atleast 10 characters")
      .max(70, "E-mail must be shorter than 70 characters")
      .email("Invalid e-mail")
      .toLowerCase(),

    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must have atleast 8 characters")
      .max(30, "Password must be shorter than 30 characters"),

    confirmPassword: z
      .string()
      .trim()
      .min(1, "Password confirmation is required")
      .min(8, "Password confirmation must have atleast 8 characters")
      .max(30, "Password confirmation must be shorter than 30 characters"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"]
  }
);
export type userFormData = z.infer<typeof userFormSchema>;

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "E-mail is required")
    .min(10, "E-mail must have atleast 10 characters")
    .max(70, "E-mail must be shorter than 70 characters")
    .email("Invalid e-mail")
    .toLowerCase(),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must have atleast 8 characters")
    .max(30, "Password must be shorter than 30 characters"),
});
export type loginFormData = z.infer<typeof loginFormSchema>;