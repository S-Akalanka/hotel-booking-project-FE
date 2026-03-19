import { Button } from "./ui/button";
import { useGetAllHotelsQuery } from "@/lib/api";
import { Link } from "react-router";
import HomeHotelCard from "./HomeHotelCard";
import HomeHotelCardSkeleton from "./HomeHotelCardSkeleton";
import LocationListings from "./LocationListings";
import ErrorMessage from "./ErrorMessage";
import { ArrowRight } from "lucide-react";

export default function MainHotelListing() {
  const {
    data: hotels = [],
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
    refetch,
  } = useGetAllHotelsQuery(undefined);

  if (isHotelsError) {
    return (
      <ErrorMessage
        title="Failed to load hotels"
        message={
          hotelsError &&
          typeof hotelsError === "object" &&
          "data" in hotelsError
            ? String(
                hotelsError.data || "Unable to fetch hotels. Please try again.",
              )
            : "Unable to fetch hotels. Please check your connection and try again."
        }
        onRetry={() => refetch()}
        className="mt-20"
      />
    );
  }

  return (
    <>
      {/* Featured Hotels */}
      <section className="py-9 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 mt-20">
            Featured Luxury Hotels
          </h2>
          <p className="text-lg">
            Handpicked exceptional properties for your perfect stay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isHotelsLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <HomeHotelCardSkeleton key={index} />
              ))
            : hotels
                .slice(0, 6)
                .map((hotel: any, index: number) => (
                  <HomeHotelCard key={index} hotel={hotel} index={index} />
                ))}
        </div>
      </section>

      <section className="pb-16 flex justify-center">
        <Link to="/hotels">
          <Button
            className="transform transition-all duration-300 hover:scale-105
           bg-gradient-to-br from-[#f0c419] via-[#ffc93d] to-[#ffe082] text-black
           hover:from-[#f29f05] hover:via-[#ffb800] hover:to-[#ffd35c]
           shadow-md hover:shadow-2xl shadow-yellow-900/20 hover:shadow-yellow-800/40
           border border-yellow-500/40 hover:border-yellow-600/50
           min-w-[260px] px-10 py-6 rounded-3xl text-[1.25rem]
           flex items-center justify-center gap-3"
          >
            View All <ArrowRight className="!w-6 !h-6" />
          </Button>
        </Link>
      </section>

      <LocationListings />
    </>
  );
}
