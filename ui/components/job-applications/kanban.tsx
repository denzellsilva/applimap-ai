import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/ui/components/card";
import { columns } from "@/ui/job-applications/kanban-columns";
import { getJobApplications } from "@/actions/jobApplication";

export async function Kanban() {
  const jobs = await getJobApplications();

  // Arrow function opens with a curly brace { because we are running logic before returning JSX
  return columns.map((column) => {
    const applicationsInColumn = jobs[column.id as keyof typeof jobs] || [];
    const count: number = applicationsInColumn.length;

    // Explicitly return the JSX enclosed in parentheses ()
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
              {count}
            </span>
          </CardAction>
        </CardHeader>

        <CardContent className="no-scrollbar flex-1 space-y-3 overflow-y-auto p-3">
          {/* Mapping through inner applications */}
          {applicationsInColumn.map((job) => (
            <Card
              key={job.id}
              className="gap-0 rounded-md bg-white p-3 shadow-sm"
            >
              <h4 className="text-sm font-semibold">{job.title}</h4>
              <p className="text-muted-foreground text-xs">{job.companyName}</p>
            </Card>
          ))}

          <Card className="text-muted-foreground flex min-h-[100px] cursor-pointer items-center justify-center border-2 border-dashed border-black/10 bg-transparent p-6 text-center shadow-none transition-colors hover:border-black/20 hover:bg-black/5">
            <span className="text-sm">
              Drop jobs here
              <br />
              or click + to add
            </span>
          </Card>
        </CardContent>
      </Card>
    );
  });
}
