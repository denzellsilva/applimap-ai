import { signIn } from "@/auth";
import React from "react";

interface AuthFormProps {
  id?: string;
  provider: "github" | "google" | "resend";
  children?: React.ReactNode;
}

export function AuthForm({ id, provider, children }: AuthFormProps) {
  const redirectTo = "/job-applications";

  return (
    <form
      action={async (formData) => {
        "use server";
        if (provider === "resend") {
          formData.set("redirectTo", redirectTo);
          await signIn(provider, formData);
        } else {
          await signIn(provider, { redirectTo });
        }
      }}
      id={id}
      className={!children ? "hidden" : undefined}
    >
      {children}
    </form>
  );
}
