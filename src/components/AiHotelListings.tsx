import { useGetHotelsByAiSearchQuery } from "@/lib/api";
import { useSelector } from "react-redux";
import HomeHotelCard from "./HomeHotelCard";
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
  } = useGetHotelsByAiSearchQuery(query);

  if (isHotelsLoading) return <p>Loading...</p>;

  if (isHotelsError) return <p>Error</p>;

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
          {hotels.slice(0, 6).map((hotel: any, index: number) => (
            <HomeHotelCard key={index} hotel={hotel} index={index} />
          ))}
        </div>
      </section>

      <section className="pb-16 flex justify-center">
        <Link to="/hotels">
          <Button className="transform transition-transform duration-300 hover:scale-103 border-solid border-[0.2px] border-black !px-[90px] py-6 rounded-3xl text-[1.25rem]">
            View All <ArrowRight className="!w-6 !h-6" />
          </Button>
        </Link>
      </section>
    </>
  );
}

export default AiHotelListings;
