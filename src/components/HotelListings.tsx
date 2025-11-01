import { Button } from "./ui/button";
import { useGetAllHotelsQuery } from "@/lib/api";
import { Link } from "react-router";
import HomeHotelCard from "./HomeHotelCard";

export default function HotelListings() {
  const {
    data: hotels = [],
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
  } = useGetAllHotelsQuery(undefined);

  if (isHotelsLoading) 
    return <p>Loading...</p>;

  if (isHotelsError) 
    return <p>Error</p>;

  return (
    <>

      {/* Featured Hotels */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">
            Featured Luxury Hotels
          </h2>
          <p className="text-muted-foreground text-lg">
            Handpicked exceptional properties for your perfect stay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel: any, index: number) => (
            <HomeHotelCard
            key={index}
            hotel = {hotel}
            index = {index}
            />
          ))}
        </div>
      </section>

      <section className="pb-16 flex justify-center">
        <Link to="/hotels">
          <Button>View All</Button>
        </Link>
      </section>

    </>
  );
}
