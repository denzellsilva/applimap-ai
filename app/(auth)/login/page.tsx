import { Button } from "@/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/card";
import { Input } from "@/ui/components/input";
import { Label } from "@/ui/components/label";
import { LabelSeparator } from "@/ui/components/labelSeparator";
import { AuthForm } from "@/ui/components/authForm";

export default function Page() {
  return (
    <>
      <AuthForm provider="resend">
        <Card className="w-full !rounded-none !border-0 !shadow-none !ring-0">
          <CardHeader>
            <CardTitle>Welcome to AppliMap!</CardTitle>
            <CardDescription>
              Enter your email below to sign in or create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
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
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Continue with Email
            </Button>
            <LabelSeparator>or</LabelSeparator>
            <Button
              form="github-oauth"
              type="submit"
              variant="outline"
              className="w-full"
            >
              Continue with GitHub
            </Button>
            <Button
              form="google-oauth"
              type="submit"
              variant="outline"
              className="w-full"
            >
              Continue with Google
            </Button>
          </CardFooter>
        </Card>
      </AuthForm>
      <AuthForm id="github-oauth" provider="github"></AuthForm>
      <AuthForm id="google-oauth" provider="google"></AuthForm>
    </>
  );
}
