"use client";
import React from "react";
import { MapPin } from "lucide-react";
import { Card } from "@/ui/components/card";
import { useKanbanActionDispatch } from "@/ui/components/job-applications/job-application-context";
import { Separator } from "@/ui/components/separator";
import { JobAppDeleteButton } from "./job-app-delete-button";

interface JobCardProps {
  id: string;
  title: string;
  companyName?: string | null;
  location?: string | null;
}

export function JobCard({ id, title, companyName, location }: JobCardProps) {
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
      <div className="mb-1 flex min-w-0 items-center justify-between gap-2">
        <h4 className="truncate text-sm font-semibold">{title}</h4>
        <JobAppDeleteButton jobId={id} title={title} />
      </div>
      <p className="text-muted-foreground truncate text-xs">
        {companyName ?? "Unknown company"}
      </p>
      {location && (
        <>
          <Separator className="my-2" />
          <p className="text-muted-foreground flex items-center gap-1 text-xs">
            <MapPin className="size-3.5" aria-hidden="true" />
            <span className="truncate">{location}</span>
          </p>
        </>
      )}
    </Card>
  );
}
