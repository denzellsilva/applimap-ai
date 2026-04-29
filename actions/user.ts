"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "../app/generated/prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";

const CreateUserSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").max(100),
    lastName: z.string().min(1, "Last name is required").max(100),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export interface State {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
}

export async function createUser(initialState: State, formData: FormData) {
  const validatedFields = CreateUserSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: "Invalid User",
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          errors: {
            email: ["This email is already used."],
          },
        };
      }
    }

    console.error(error);

    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  return {
    message: "User created successfully",
  };
}
