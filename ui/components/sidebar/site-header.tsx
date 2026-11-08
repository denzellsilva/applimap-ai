"use client";

import { Button } from "@/ui/components/button";
import { Separator } from "@/ui/components/separator";
import { useSidebar } from "@/ui/components/sidebar";
import { quantico } from "@/ui/fonts";
import { PanelLeftIcon, Sun } from "lucide-react";
import { UserAvatar } from "@/ui/components/sidebar/user-avatar";

export function SiteHeader({
  user,
}: {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex h-(--header-height) w-full items-center justify-between border-b px-4">
      <div className="flex flex-1 items-center gap-2">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <PanelLeftIcon />
        </Button>
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <div id="logo" className={`${quantico.className} text-3xl`}>
          <span className="font-bold text-green-800">Appli</span>Map
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <Sun />
        </Button>
        <UserAvatar user={user} />
      </div>
    </header>
  );
}
