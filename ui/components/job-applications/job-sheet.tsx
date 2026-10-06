"use client";

import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/components/sheet";
import { Button } from "@/ui/components/button";
import {
  useKanbanAction,
  useKanbanActionDispatch,
} from "@/ui/components/job-applications/job-application-context";
import { JobFields } from "./job-fields";

export function JobSheet() {
  const kanbanAction = useKanbanAction();
  const kanbanActionDispatch = useKanbanActionDispatch();

  return (
    <Sheet
      open={kanbanAction.openSheet}
      onOpenChange={(open) => {
        if (!open) {
          kanbanActionDispatch({ type: "close" });
        }
      }}
    >
      <SheetTrigger asChild>
        <Button
          size="sm"
          onClick={() =>
            kanbanActionDispatch({
              type: "create",
            })
          }
        >
          <Plus className="mr-1.5 size-4" /> Add job
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-sm md:max-w-xl lg:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Add a Job Application</SheetTitle>
          <SheetDescription>
            Enter the details of the job application you want to track.
          </SheetDescription>
        </SheetHeader>

        <JobFields
          key={`${kanbanAction.formKey}-${kanbanAction.selectedJob ?? "new"}`}
          id={kanbanAction.selectedJob}
        />
      </SheetContent>
    </Sheet>
  );
}
