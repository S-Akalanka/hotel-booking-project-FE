import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function HotelsPageCardSkeleton() {
  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col lg:flex-row">
      <div className="relative overflow-hidden w-full h-64 lg:w-80 lg:flex-shrink-0">
        <Skeleton className="w-full h-full" />
        <div className="absolute bottom-4 left-4">
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>

      <CardContent className="p-6 flex-1">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-6 w-2/3" />
          <div className="text-right">
            <Skeleton className="h-8 w-20 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        <div className="flex items-center mb-2">
          <Skeleton className="h-4 w-4 mr-1 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="flex items-center mb-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-sm" />
            ))}
          </div>
          <Skeleton className="h-4 w-20 ml-2" />
        </div>

        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-4" />

        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-18 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>

        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
