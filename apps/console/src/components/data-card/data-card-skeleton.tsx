import { Card, CardContent, CardHeader, Skeleton } from "@dashbored/ui";

interface DataCardSkeletonProps {
  /**
   * Number of rows to render
   * @default 3
   */
  cards?: number;
}

export function DataCardSkeleton({ cards = 6 }: DataCardSkeletonProps) {
  return (
    <>
      <div className="col-span-full">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {new Array(cards).fill(0).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="flex-1 space-y-1">
                  <Skeleton className="my-1.5 h-8 w-full max-w-[10rem]" />
                  <Skeleton className="my-1.5 h-4 w-full max-w-[20rem]" />
                  <Skeleton className="my-1.5 h-4 w-full max-w-[6rem]" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="my-1.5 h-4 w-full max-w-[10rem]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
