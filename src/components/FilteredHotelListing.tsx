import { useFilterHotelsQuery } from "@/lib/api";
import HomeHotelCard from "./HomeHotelCard";
import HomeHotelCardSkeleton from "./HomeHotelCardSkeleton";
import ErrorMessage from "./ErrorMessage";
import { useSelector } from "react-redux";

export default function FilteredHotelListing() {
  const filter = useSelector((state: any) => state.filter);
  const filters = {
    location: filter.location,
    checkIn: filter.checkIn,
    checkOut: filter.checkOut,
    guest: filter.guest,
  };

  const {
    data: searchHotels,
    isLoading,
    isError,
    error,
    refetch,
  } = useFilterHotelsQuery(filters);

  if (isError) {
    return (
      <ErrorMessage
        title="Failed to search hotels"
        message={
          error && typeof error === "object" && "data" in error
            ? String(error.data || "Unable to search hotels. Please try again.")
            : "Unable to search hotels. Please check your filters and try again."
        }
        onRetry={() => refetch()}
        className="mt-20"
      />
    );
  }

  return (
    <>
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 mt-20">
            Search Results
          </h2>
          {searchHotels.length === 0
            ? <p className="text-lg pb-64">No hotels found. Try adjusting your filters.</p>
            : <p className="text-lg">Handpicked exceptional properties for your perfect stay</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <HomeHotelCardSkeleton key={index} />
            ))
          ) : (
            searchHotels?.slice(0, 6).map((hotel: any, index: number) => (
              <HomeHotelCard key={index} hotel={hotel} index={index} />
            ))
          )}
        </div>
      </section>
    </>
  );
}
