import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useSearchHotelsQuery } from "@/lib/api";
import HotelsPageCard from "./HotelsPageCard";
import FilterSidebar from "./FilterSiderbar";
import { Filter } from "lucide-react";
import { useSelector } from "react-redux";

export function HotelsSearchListing() {
  const search = useSelector((state: any) => state.search);
  const filters = {
    query: search.query,
    sortBy: search.sortBy,
    page: search.page,
    maxPrice: search.maxPrice,
    minPrice: search.minPrice,
    rating: search.rating,
    amenities: search.amenities,
  };

  const {
    data: hotels = [],
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
  } = useSearchHotelsQuery(filters);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar />
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
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>

          {/* Hotels List */}
          <div className="space-y-6">
            {hotels.map((hotel: any, index: number) => (
              <HotelsPageCard key={hotel._id} hotel={hotel} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
