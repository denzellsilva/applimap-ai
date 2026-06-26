"use client";

import { Button } from "@/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/card";
import { Input } from "@/ui/components/input";
import { Label } from "@/ui/components/label";
import { LabelSeparator } from "@/ui/components/labelSeparator";
import { AuthForm, AuthProvider } from "@/ui/components/login/authForm";
import { Mail } from "lucide-react";
import { Google } from "@/ui/components/login/google";
import { GitHub } from "@/ui/components/login/github";
import { useState } from "react";
import { Spinner } from "@/ui/components/spinner";
import { Field, FieldError, FieldLabel } from "@/ui/components/field";

interface OAuthButtonConfig {
  provider: Exclude<AuthProvider, "resend">;
  formId: string;
  label: string;
  icon: React.ReactNode;
}

const OAUTH_PROVIDERS: OAuthButtonConfig[] = [
  {
    provider: "google",
    formId: "google-oauth",
    label: "Continue with Google",
    icon: <Google />,
  },
  {
    provider: "github",
    formId: "github-oauth",
    label: "Continue with GitHub",
    icon: <GitHub />,
  },
];

export default function Page() {
  const [pendingButton, setPendingButton] = useState<AuthProvider | null>(null);

  return (
    <>
      <AuthForm provider="resend" setPendingButton={setPendingButton}>
        {(state) => (
          <Card className="w-full !rounded-none !border-0 !shadow-none !ring-0">
            <CardHeader>
              <CardTitle>Welcome to AppliMap!</CardTitle>
              <CardDescription>
                Enter your email below to sign in or create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Field data-invalid={state.errors?.email ? true : false}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={state.fields?.email || ""}
                  placeholder="e.g. Software Engineer"
                  aria-invalid={state.errors?.email ? true : false}
                  required
                />
                {state.errors?.email && (
                  <FieldError>{state.errors.email[0]}</FieldError>
                )}
              </Field>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                {pendingButton === "resend" ? (
                  <Spinner />
                ) : (
                  <>
                    <Mail />
                    Continue with Email{" "}
                  </>
                )}
              </Button>
              <LabelSeparator>or</LabelSeparator>
              {OAUTH_PROVIDERS.map(({ provider, formId, label, icon }) => (
                <Button
                  key={provider}
                  form={formId}
                  type="submit"
                  variant="outline"
                  className="w-full"
                >
                  {pendingButton === provider ? (
                    <Spinner />
                  ) : (
                    <>
                      {icon}
                      {label}
                    </>
                  )}
                </Button>
              ))}
            </CardFooter>
          </Card>
        )}
      </AuthForm>
      {OAUTH_PROVIDERS.map(({ provider, formId }) => (
        <AuthForm
          key={provider}
          id={formId}
          provider={provider}
          setPendingButton={setPendingButton}
        />
      ))}
    </>
  );
}
