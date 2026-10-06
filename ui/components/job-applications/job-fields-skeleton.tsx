import { Skeleton } from "@/ui/components/skeleton";

export function JobFieldsSkeleton() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="space-y-2" key={index}>
            <Skeleton className="h-4 w-24 bg-gray-200" />
            <Skeleton className="h-9 w-full bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-36 bg-gray-200" />
        <Skeleton className="h-24 w-full bg-gray-200" />
      </div>
    </div>
  );
}
