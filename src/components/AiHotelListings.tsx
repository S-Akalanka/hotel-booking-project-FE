import { useGetHotelsByAiSearchQuery } from "@/lib/api";
import { useSelector } from "react-redux";
import HomeHotelCard from "./HomeHotelCard";
import HomeHotelCardSkeleton from "./HomeHotelCardSkeleton";
import ErrorMessage from "./ErrorMessage";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

function AiHotelListings() {
  const query = useSelector((state: any) => state.aiSearch.query);

  const {
    data: hotels,
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
    refetch,
  } = useGetHotelsByAiSearchQuery(query);

  if (isHotelsError) {
    return (
      <ErrorMessage
        title="Failed to load hotels"
        message={
          hotelsError && typeof hotelsError === "object" && "data" in hotelsError
            ? String(hotelsError.data || "Unable to fetch hotels. Please try again.")
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
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className=" text-3xl md:text-4xl mb-4 mt-20">
            Featured Luxury Hotels
          </h2>
          <p className="text-lg">
            Handpicked exceptional properties for your perfect stay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isHotelsLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <HomeHotelCardSkeleton key={index} />
            ))
          ) : (
            hotels?.slice(0, 6).map((hotel: any, index: number) => (
              <HomeHotelCard key={index} hotel={hotel} index={index} />
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default AiHotelListings;
