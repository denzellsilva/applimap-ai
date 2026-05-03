import { signIn, signOut } from "@/auth";

export function SignIn({ provider }: { provider?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button className="rounded-md bg-neutral-700 p-2 text-white">
        Sign In with {provider}
      </button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <button className="rounded-md bg-neutral-700 p-2 text-white">
        Sign Out
      </button>
    </form>
  );
}
