import { Button } from "@/app/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/card";
import { Input } from "@/app/ui/components/input";
import { Label } from "@/app/ui/components/label";

export default function Page() {
  return (
    <form>
      <Card className="w-full !rounded-none !border-0 !shadow-none !ring-0">
        <CardHeader>
          <CardTitle>Welcome to AppliMap!</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
          {/* <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction> */}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
