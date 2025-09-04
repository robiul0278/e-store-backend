import { z } from 'zod';

export const userRegisterValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "name is required!" }),
    email: z.string().email({ message: "invalid email address!" }).min(1, { message: "email is required!" }),
    password: z.string().min(6, { message: "password must be 6 characters!" }),
    photo: z.string().min(1, { message: "photo is required!" }),
  }),
});

export const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "invalid email address!" }).min(1, { message: "email is required!" }),
    password: z.string().min(6, { message: "password must be 6 characters!" }),
  }),
});


export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export const forgotPasswordValidationSchema = z.object({
  body: z.object({
   email: z.string().email({ message: "invalid email address!" }).min(1, { message: "email is required!" }),
  })
})

export const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "invalid email address!" }).min(1, { message: "email is required!" }),
    newPassword: z.string().min(6, { message: "password must be 6 characters!" }),
  })
})

// Define the validation schema for the role
export const roleValidationSchema = z.object({
  body: z.object({
    role: z.enum(["user", "admin"]).default("user")
  })
});