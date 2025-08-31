import { z } from 'zod';

export const userRegisterValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    photo: z.string().url({ message: "Photo must be a valid URL" }).optional(),
  }),
});

export const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
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
    email: z.string({
      required_error: 'User email is required!',
    })
  })
})

export const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'User email is required!',
    }),
    newPassword: z.string({
      required_error: 'User password is required!',
    })
  })
})

// Define the validation schema for the role
export const roleValidationSchema = z.object({
    body: z.object({
        role: z.enum(["user", "admin"]).default("user")
    })
});