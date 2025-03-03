import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const ServiceCardSkeleton = ({ index }: { index: number }) => {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col py-10 dark:border-neutral-800 lg:border-r",
        (index === 0 || index === 4) && "dark:border-neutral-800 lg:border-l",
        index < 4 && "dark:border-neutral-800 lg:border-b",
      )}
    >
      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      <div className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-2/3" />
      </div>
    </div>
  );
};
