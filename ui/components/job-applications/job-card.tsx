"use client";
import React from "react";
import { Card } from "@/ui/components/card";
import { useKanbanActionDispatch } from "@/ui/components/job-applications/job-application-context";

interface JobCardProps {
  id: string;
  title: string;
  companyName?: string | null;
}

export function JobCard({ id, title, companyName }: JobCardProps) {
  const kanbanActionDispatch = useKanbanActionDispatch();
  const handleClick = () => {
    kanbanActionDispatch({
      type: "edit",
      selectedJob: id,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      kanbanActionDispatch({
        type: "edit",
        selectedJob: id,
      });
    }
  };

  return (
    <Card
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="cursor-pointer gap-0 rounded-md bg-white p-3 shadow-sm hover:bg-gray-50"
    >
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="text-muted-foreground text-xs">
        {companyName ?? "Unknown company"}
      </p>
    </Card>
  );
}
