import { quantico } from "@/ui/fonts";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-200 p-2 px-4">
        <div id="logo" className={`${quantico.className} text-3xl`}>
          <span className="font-bold text-green-800">Appli</span>Map
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit" aria-label="Sign out" title="Sign out">
            <LogOut />
          </button>
        </form>
      </header>
      <main>{children}</main>
    </>
  );
}
