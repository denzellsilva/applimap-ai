import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/components/card";
import { AddJobSheet } from "@/ui/components/job-applications/add-job-sheet";
import { columns } from "@/ui/job-applications/kanban-columns";

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
        {columns.map((col) => (
          <Card
            key={col.id}
            className={`flex min-w-[280px] flex-1 flex-col gap-0 border-none py-3.5 shadow-none ${col.bg}`}
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${col.dot}`} />
                <CardTitle className={`text-sm tracking-wide ${col.text}`}>
                  {col.title}
                </CardTitle>
              </div>
              <CardAction>
                <span
                  className={`rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium ${col.text}`}
                >
                  0
                </span>
              </CardAction>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-3 p-3">
              <Card className="text-muted-foreground flex min-h-[100px] cursor-pointer items-center justify-center border-2 border-dashed border-black/10 bg-transparent p-6 text-center shadow-none transition-colors hover:border-black/20 hover:bg-black/5">
                <span className="text-sm">
                  Drop jobs here
                  <br />
                  or click + to add
                </span>
              </Card>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
