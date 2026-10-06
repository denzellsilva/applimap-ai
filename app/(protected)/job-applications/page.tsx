import { JobSheet } from "@/ui/components/job-applications/job-sheet";
import { Kanban } from "@/ui/components/job-applications/kanban";
import { Suspense } from "react";
import { KanbanSkeleton } from "@/ui/components/job-applications/kanban-skeleton";
import { KanbanActionProvider } from "@/ui/components/job-applications/job-application-context";

export default function Page() {
  return (
    <KanbanActionProvider>
      <div className="flex h-[calc(100vh-36px-8px-40px-16px)] flex-col gap-3">
        <section>
          <h1 className="text-2xl font-semibold">Job Applications</h1>
          <div className="flex items-center justify-between">
            <p className="my-0.5 text-gray-800">Track your job applications</p>
            <JobSheet />
          </div>
        </section>

        <section className="flex flex-1 gap-4 overflow-x-auto p-1 pb-4">
          <Suspense fallback={<KanbanSkeleton />}>
            <Kanban />
          </Suspense>
        </section>
      </div>
    </KanbanActionProvider>
  );
}
