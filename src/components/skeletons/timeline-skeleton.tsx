import { Skeleton } from "@/components/ui/skeleton";

export function TimelineSkeleton() {
  return (
    <div className="w-full bg-white font-sans dark:bg-neutral-950 p-4 md:px-4">
      <div className="mx-auto max-w-7xl pt-10">
        <Skeleton className="mb-4 h-8 w-48 max-w-4xl rounded-md" />
        <Skeleton className="h-5 w-64 max-w-sm rounded-md" />
      </div>

      <div className="relative mx-auto max-w-7xl pb-20">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-20">
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-black md:left-3">
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <Skeleton className="hidden h-6 w-32 rounded-md md:block md:pl-20 md:text-3xl" />
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <Skeleton className="mb-4 block h-6 w-48 rounded-md md:hidden" />
              <Skeleton className="mb-8 h-4 w-full rounded-md" />
              <Skeleton className="mb-8 h-4 w-3/4 rounded-md" />
              <div className="grid grid-cols-2 gap-4">
                {[...Array(2)].map((_, imgIndex) => (
                  <Skeleton
                    key={imgIndex}
                    className="h-20 w-full rounded-lg md:h-44 lg:h-60"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="absolute left-8 top-0 w-[2px] h-full bg-neutral-200 dark:bg-neutral-700 md:left-8" />
      </div>
    </div>
  );
}