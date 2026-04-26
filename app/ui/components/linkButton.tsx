import Link from "next/link";
import { Button } from "@/app/ui/components/button";
import type { ReactNode } from "react";

type LinkButtonProps = React.ComponentProps<typeof Link> & {
  children: ReactNode;
  className?: string;
};

export function LinkButton({
  children,
  className,
  ...linkProps
}: LinkButtonProps) {
  return (
    <Link {...linkProps}>
      <Button variant="link" className={className}>
        {children}
      </Button>
    </Link>
  );
}
