import { Header } from "@/components/dashboard/header";
import { DataCardSkeleton } from "@/components/data-card/data-card-skeleton";
import { Skeleton } from "@dashbored/ui";

export default function Loading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      <div className="col-span-full flex w-full justify-between">
        <Header.Skeleton>
          <Skeleton className="h-9 w-20" />
        </Header.Skeleton>
      </div>
      <div className="col-span-full w-full">
        <DataCardSkeleton />
      </div>
    </div>
  );
}
