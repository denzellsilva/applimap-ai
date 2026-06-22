import { Skeleton } from "@/ui/components/skeleton";
import { columns } from "@/ui/job-applications/kanban-styles";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/ui/components/card";
export function KanbanSkeleton() {
  const kanbanColumns = columns.map((column) => {
    return (
      <Card
        key={column.id}
        className={`flex min-w-[280px] flex-1 flex-col gap-0 border-none py-3.5 shadow-none ${column.bg}`}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${column.dot}`} />
            <CardTitle className={`text-sm tracking-wide ${column.text}`}>
              {column.title}
            </CardTitle>
          </div>
          <CardAction>
            <span
              className={`rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium ${column.text}`}
            >
              0
            </span>
          </CardAction>
        </CardHeader>

        <CardContent className="no-scrollbar flex-1 space-y-3 overflow-y-auto p-3">
          <Skeleton className="h-15 gap-0 rounded-md bg-white p-3 opacity-45" />
          <Skeleton className="h-15 gap-0 rounded-md bg-white p-3 opacity-45" />
          <Skeleton className="h-15 gap-0 rounded-md bg-white p-3 opacity-45" />
        </CardContent>
      </Card>
    );
  });

  return kanbanColumns;
}
