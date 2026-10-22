"use client";
import React, { useTransition } from "react";
import { MapPin, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle } from "@/ui/components/card";
import { Button } from "@/ui/components/button";
import { deleteJobApplication } from "@/actions/jobApplication";
import { useKanbanActionDispatch } from "@/ui/components/job-applications/job-application-context";
import { Separator } from "@/ui/components/separator";

interface JobCardProps {
  id: string;
  title: string;
  companyName?: string | null;
  location?: string | null;
}

export function JobCard({ id, title, companyName, location }: JobCardProps) {
  const kanbanActionDispatch = useKanbanActionDispatch();
  const [isDeleting, startDeleting] = useTransition();
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

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!window.confirm(`Delete "${title}"?`)) {
      return;
    }

    startDeleting(async () => {
      try {
        await deleteJobApplication(id);
        toast.success("Job application deleted", { position: "top-center" });
      } catch (error) {
        console.error("Failed to delete job application:", error);
        toast.error("Failed to delete job application", {
          position: "top-center",
        });
      }
    });
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
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="text-muted-foreground hover:text-destructive shrink-0"
          aria-label={`Delete ${title}`}
          disabled={isDeleting}
          onClick={handleDelete}
        >
          <Trash2 />
        </Button>
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
