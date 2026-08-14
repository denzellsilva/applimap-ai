"use client";
import React from "react";
import { Card } from "@/ui/components/card";
import { useSetOpenSheet } from "@/ui/components/job-applications/job-application-context";

interface ApplicationCardProps {
  id: string;
  title: string;
  companyName?: string | null;
}

export function ApplicationCard({
  id,
  title,
  companyName,
}: ApplicationCardProps) {
  const setOpen = useSetOpenSheet();

  const handleClick = () => {
    setOpen(true);
    console.log(id);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      console.log(id);
    }
  };

  return (
    <Card
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="gap-0 rounded-md bg-white p-3 shadow-sm"
    >
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="text-muted-foreground text-xs">
        {companyName ?? "Unknown company"}
      </p>
    </Card>
  );
}
