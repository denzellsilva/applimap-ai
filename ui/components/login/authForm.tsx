"use client";

import React from "react";
import { State, signInAction } from "@/actions/auth";
import { useActionState, useEffect, Dispatch, SetStateAction } from "react";

export type AuthProvider = "github" | "google" | "resend";

interface AuthFormProps {
  id?: string;
  provider: AuthProvider;
  setPendingButton?: Dispatch<SetStateAction<AuthProvider | null>>;
  children?: React.ReactNode;
}

const initialState: State = { message: null, errors: {} };

export function AuthForm({
  id,
  provider,
  setPendingButton,
  children,
}: AuthFormProps) {
  const singInWithProvider = signInAction.bind(null, provider);

  const [state, formAction, pending] = useActionState(
    singInWithProvider,
    initialState,
  );

  useEffect(() => {
    if (pending) {
      setPendingButton?.(provider);
    }
  }, [pending, provider, setPendingButton]);

  return (
    <>
      <form
        action={formAction}
        id={id}
        className={!children ? "hidden" : undefined}
      >
        {children}
      </form>
    </>
  );
}
