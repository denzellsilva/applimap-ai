import { AddJobSheet } from "@/ui/components/job-applications/add-job-sheet";
import { Kanban } from "@/ui/components/job-applications/kanban";
import { Suspense } from "react";
import { KanbanSkeleton } from "@/ui/components/job-applications/kanban-skeleton";

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col gap-3">
      <section>
        <h1 className="text-2xl font-semibold">Job Applications</h1>
        <div className="flex items-center justify-between">
          <p className="my-0.5 text-gray-800">Track your job applications</p>
          <AddJobSheet />
        </div>
      </section>

      <section className="flex flex-1 gap-4 overflow-x-auto pt-1 pb-4">
        <Suspense fallback={<KanbanSkeleton />}>
          <Kanban />
        </Suspense>
      </section>
    </div>
  );
}
