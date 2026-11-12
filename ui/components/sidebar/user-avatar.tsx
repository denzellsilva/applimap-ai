"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/avatar";

export function UserAvatar({
  user,
}: {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div>
      <Avatar>
        <AvatarImage src={user.image ?? undefined} alt={user.name} />
        <AvatarFallback>
          {initials || user.email[0]?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
