import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function FollowUpGridSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 md:grid-cols-3">
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl p-4",
          "border border-gray-100/80 bg-white dark:border-white/10 dark:bg-black",
          "col-span-1 md:col-span-2",
        )}
      >
        <div className="relative flex flex-col space-y-3">
          <Skeleton className="h-8 w-8 rounded-lg" />

          <Skeleton className="h-5 w-20 rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </div>

          <Skeleton className="h-4 w-24 rounded-lg" />
        </div>
      </div>

      <div
        className={cn(
          "group relative overflow-hidden rounded-xl p-4",
          "border border-gray-100/80 bg-white dark:border-white/10 dark:bg-black",
        )}
      >
        <div className="relative flex flex-col space-y-3">
          <Skeleton className="h-8 w-8 rounded-lg" />

          <Skeleton className="h-5 w-20 rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "group relative overflow-hidden rounded-xl p-4",
          "border border-gray-100/80 bg-white dark:border-white/10 dark:bg-black",
          "col-span-1 md:col-span-2",
        )}
      >
        <div className="relative flex flex-col space-y-3">
          <Skeleton className="h-8 w-8 rounded-lg" />

          <Skeleton className="h-5 w-20 rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "group relative overflow-hidden rounded-xl p-4",
          "border border-gray-100/80 bg-white dark:border-white/10 dark:bg-black",
        )}
      >
        <div className="relative flex flex-col space-y-3">
          <Skeleton className="h-8 w-8 rounded-lg" />

          <Skeleton className="h-5 w-20 rounded-lg" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
