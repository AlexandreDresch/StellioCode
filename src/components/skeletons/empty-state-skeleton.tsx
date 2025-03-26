import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function EmptyStateSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-border bg-background text-center hover:border-border/80",
        "w-full rounded-xl border-2 border-dashed p-14",
        "group transition duration-500 hover:bg-muted/50 hover:duration-200",
        className,
      )}
    >
      <div className="isolate flex justify-center">
        <div className="relative left-2.5 top-1.5 grid size-12 -rotate-6 place-items-center rounded-xl bg-background shadow-lg ring-1 ring-border transition duration-500 group-hover:-translate-x-5 group-hover:-translate-y-0.5 group-hover:-rotate-12 group-hover:duration-200">
          <Skeleton className="h-6 w-6 rounded-full bg-muted-foreground/20" />
        </div>
        <div className="relative z-10 grid size-12 place-items-center rounded-xl bg-background shadow-lg ring-1 ring-border transition duration-500 group-hover:-translate-y-0.5 group-hover:duration-200">
          <Skeleton className="h-6 w-6 rounded-full bg-muted-foreground/20" />
        </div>
        <div className="relative right-2.5 top-1.5 grid size-12 rotate-6 place-items-center rounded-xl bg-background shadow-lg ring-1 ring-border transition duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-5 group-hover:rotate-12 group-hover:duration-200">
          <Skeleton className="h-6 w-6 rounded-full bg-muted-foreground/20" />
        </div>
      </div>

      <Skeleton className="mx-auto mt-6 h-6 w-1/2 bg-muted-foreground/20" />

      <Skeleton className="mx-auto mt-2 h-4 w-3/4 bg-muted-foreground/20" />
      <Skeleton className="mx-auto mt-2 h-4 w-2/3 bg-muted-foreground/20" />

      <div className="mt-4 flex justify-center">
        <Skeleton className="h-10 w-40 rounded-lg bg-muted-foreground/20" />
      </div>
    </div>
  );
}
