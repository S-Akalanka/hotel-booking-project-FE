import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useSearchHotelsQuery } from "@/lib/api";
import HotelsPageCard from "./HotelsPageCard";
import HotelsPageCardSkeleton from "./HotelsPageCardSkeleton";
import ErrorMessage from "./ErrorMessage";
import FilterSidebar from "./FilterSiderbar";
import { Filter } from "lucide-react";
import { useSelector } from "react-redux";

export function HotelsSearchListing(props: any) {
  const hotels = props.hotels || [];
  const isLoading = props.isLoading || false;
  const isError = props.isError || false;
  const error = props.error;
  const onRetry = props.onRetry;

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
          <div className="space-y-6 flex-1">
            {isError ? (
              <div className="w-full">
                <ErrorMessage
                  title="Failed to load hotels"
                  message={
                    error && typeof error === "object" && "data" in error
                      ? String(error.data || "Unable to fetch hotels. Please try again.")
                      : "Unable to fetch hotels. Please check your connection and try again."
                  }
                  onRetry={onRetry}
                />
              </div>
            ) : isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <HotelsPageCardSkeleton key={index} />
              ))
            ) : hotels.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No hotels found. Try adjusting your search criteria.</p>
              </div>
            ) : (
              hotels.map((hotel: any, index: number) => (
                <HotelsPageCard key={hotel._id} hotel={hotel} index={index} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
