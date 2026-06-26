// @/app/actions/auth.ts
"use server";

import { signIn } from "@/auth";
import { z } from "zod";

const AuthSchema = z.object({
  email: z.email(),
});

export interface State {
  errors?: {
    email?: string[];
  };
  message?: string | null;
}

export async function signInAction(
  provider: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const redirectTo = "/job-applications";

  if (provider === "resend") {
    const rawFields = {
      email: formData.get("email") as string,
    };

    const validatedFields = AuthSchema.safeParse(rawFields);

    if (!validatedFields.success) {
      return {
        errors: z.flattenError(validatedFields.error).fieldErrors,
        message: "Invalid account",
      };
    }
  }

  try {
    if (provider === "resend") {
      await signIn(provider, formData);
    } else {
      await signIn(provider, { redirectTo });
    }

    return { message: "Signed in successfully" };
  } catch (error) {
    // NextAuth handles redirects by throwing a specific error.
    // We must rethrow it so the redirect actually happens.
    if ((error as Error).message === "NEXT_REDIRECT") {
      throw error;
    }

    return { message: "Something went wrong" };
  }
}
