import { quantico } from "@/ui/fonts";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="ite flex items-center justify-between border-b border-gray-200 p-2 px-4">
        <h1 className={`${quantico.className} text-3xl`}>
          <span className="font-bold text-green-800">Appli</span>Map
        </h1>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button>
            <LogOut />
          </button>
        </form>
      </header>
      <main>{children}</main>
    </>
  );
}
