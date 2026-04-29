"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/ui/components/button";
import { Card, CardContent, CardFooter } from "@/ui/components/card";
import { Input } from "@/ui/components/input";
import { Label } from "@/ui/components/label";
import { LabelSeparator } from "@/ui/components/labelSeparator";
import { LinkButton } from "@/ui/components/linkButton";
import { createUser, State } from "@/actions/user";

const initialState: State = { message: null, errors: {} };

export default function Page() {
  const [state, formAction] = useActionState(createUser, initialState);
  return (
    <form action={formAction}>
      <Card className="w-full !rounded-none !border-0 !shadow-none !ring-0">
        <CardContent>
          <div className="mt-6 flex flex-col gap-4">
            <Button variant="outline" className="w-full" type="button">
              Sign up with Google
            </Button>
            <LabelSeparator>or</LabelSeparator>
            <div className="flex justify-between gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" type="text" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" type="text" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div>
            <span>Already have an account? </span>
            <LinkButton href="/login" className="px-0">
              Login
            </LinkButton>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
