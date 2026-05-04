import { signIn } from "@/auth";

interface OauthFormProps {
  id: string;
  provider: "github" | "google";
}

export function OauthForm({ id, provider }: OauthFormProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
      className="hidden"
      id={id}
    ></form>
  );
}
