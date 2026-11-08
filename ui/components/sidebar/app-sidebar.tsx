"use client";

import * as React from "react";

import { NavMain } from "@/ui/components/sidebar/nav-main";
// import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/components/sidebar";
import { LayoutDashboardIcon, ListIcon, LogOut, Radar } from "lucide-react";
import { signOutAction } from "@/actions/auth";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Job Tracker",
      url: "/job-applications",
      icon: <Radar />,
    },
    {
      title: "JD Analysis",
      url: "/jd-analysis",
      icon: <ListIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      collapsible="icon"
      {...props}
    >
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <form action={signOutAction} className="flex items-center">
              <SidebarMenuButton
                tooltip="Sign out"
                type="submit"
                aria-label="Sign out"
              >
                <LogOut />
                <span>Sign out</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
