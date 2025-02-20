import { Skeleton } from "@/components/ui/skeleton";

export function DeveloperFormSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full rounded-md" />
      <Skeleton className="h-8 w-full rounded-md" />
      <div className="flex w-full gap-2">
        <Skeleton className="h-8 w-1/2 rounded-md" />
        <Skeleton className="h-8 w-1/2 rounded-md" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
