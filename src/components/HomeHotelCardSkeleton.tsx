import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function HomeHotelCardSkeleton() {
    return (
        <Card className="py-0 overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
            <div className="relative overflow-hidden">
                <Skeleton className="w-full h-64" />
                <div className="absolute bottom-4 left-4">
                    <Skeleton className="h-6 w-12 rounded-full" />
                </div>
            </div>
            <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="flex items-center mb-4">
                    <Skeleton className="h-4 w-4 mr-1 rounded-full" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-18 rounded-full" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <Skeleton className="h-8 w-20 mb-1" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-10 w-32 rounded-md" />
                </div>
            </CardContent>
        </Card>
    );
}
