import type { ReactNode } from "react";
import { Separator } from "@/ui/components/separator";

export function LabelSeparator({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center">
      <Separator className="flex-1" />
      <span className="px-2.5">{children}</span>
      <Separator className="flex-1" />
    </div>
  );
}
