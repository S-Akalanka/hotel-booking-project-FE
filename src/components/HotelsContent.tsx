import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useGetAllHotelsQuery } from "@/lib/api";
import HotelsPageCard from "./HotelsPageCard";
import FilterSidebar from "./FilterSiderbar";
import { Filter } from "lucide-react";

// interface HotelsPageProps {
//   onPageChange: (page: string) => void;
// }

// export function HotelsPage({ onPageChange }: HotelsPageProps) {
export function HotelsContent() {

  const {
    data: hotels = [],
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
  } = useGetAllHotelsQuery(undefined);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="sm">
                  Clear All
                </Button>
              </div>
              <FilterSidebar />
            </Card>
          </div>

          {/* Mobile Filter Sheet */}
          <Sheet>
            <SheetTrigger
              asChild
              className="lg:hidden fixed bottom-4 right-4 z-50"
            >
              <Button className="rounded-full w-14 h-14 luxury-gradient border-0">
                <Filter className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="mt-6">
                <h2 className="font-semibold text-lg mb-6">Filters</h2>
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>

          {/* Hotels List */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {hotels.length} hotels found
              </p>
            </div>

            <div className="space-y-6">
              {hotels.map((hotel: any, index: number) => (
                <HotelsPageCard key={hotel._id} hotel={hotel} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
