import { signIn } from "@/auth";
import React from "react";

interface AuthFormProps {
  id?: string;
  provider: "github" | "google" | "resend";
  children?: React.ReactNode;
}

export function AuthForm({ id, provider, children }: AuthFormProps) {
  return (
    <form
      action={async (formData) => {
        "use server";
        if (provider === "resend") {
          await signIn(provider, formData);
        } else {
          await signIn(provider);
        }
      }}
      id={id}
      className={!children ? "hidden" : undefined}
    >
      {children}
    </form>
  );
}
