import { auth } from "@/auth";
import { AppSidebar } from "@/ui/components/sidebar/app-sidebar";
import { SiteHeader } from "@/ui/components/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/ui/components/sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  return (
    <>
      <div className="[--header-height:calc(--spacing(14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader
            user={{
              name: user.name ?? "User",
              email: user.email ?? "",
              image: user.image ?? null,
            }}
          />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset className="min-w-0">
              <main className="flex-1 px-10 pt-10">{children}</main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </>
  );
}
