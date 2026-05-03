import Link from "next/link";
import { Button } from "@/ui/components/button";
import type { ComponentProps, ReactNode } from "react";

interface LinkButtonProps extends ComponentProps<typeof Link> {
  children: ReactNode;
  className?: string;
}

export function LinkButton({
  children,
  className,
  ...linkProps
}: LinkButtonProps) {
  return (
    <Link {...linkProps}>
      <Button variant="link" className={className} type="button">
        {children}
      </Button>
    </Link>
  );
}
