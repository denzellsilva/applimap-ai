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
import { LinkButton } from "@/ui/components/linkButton";
import { signIn } from "@/auth";

export default function Page() {
  return (
    <>
      <form>
        <Card className="w-full !rounded-none !border-0 !shadow-none !ring-0">
          <CardHeader>
            <CardTitle>Welcome to AppliMap!</CardTitle>
            <CardDescription>
              Enter your email and password below to login to your account
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
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <LabelSeparator>or</LabelSeparator>
            <Button form="github-oauth" variant="outline" className="w-full">
              Login with GitHub
            </Button>
            <div>
              <span>New to AppliMap? </span>
              <LinkButton href="/register" className="px-0">
                Create an Account
              </LinkButton>
            </div>
          </CardFooter>
        </Card>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
        id="github-oauth"
        className="hidden"
      ></form>
    </>
  );
}
