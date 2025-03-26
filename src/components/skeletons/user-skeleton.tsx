import { Skeleton } from "@/components/ui/skeleton";

export function UserSkeleton() {
  return (
    <div className="flex items-center space-x-4 py-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[130px]" />
        <Skeleton className="h-3 w-[200px]" />
      </div>
    </div>
  );
}
