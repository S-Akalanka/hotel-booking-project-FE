import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./ImageWithFallback";
import { Badge } from "./ui/badge";
import { useGetAllHotelsQuery, useGetAllLocationsQuery } from "@/lib/api";
import { Link } from "react-router";

export default function HomeContent() {
  const {
    data: hotels,
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
  } = useGetAllHotelsQuery(undefined);

  const {
    data: locations,
    isLoading: isLocationsLoading,
    isError: isLocationsError,
    error: locationsError,
  } = useGetAllLocationsQuery(undefined);

  const isLoading = isHotelsLoading || isLocationsLoading;
  const isError = isHotelsError || isLocationsError;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  console.log("Hotels data:", hotels);

  return (
    <main>
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
            <motion.div
              key={hotel._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="py-0 overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-black/70 text-white border-0">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {hotel.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl mb-2">{hotel.name}</h3>
                  <p className="text-muted-foreground mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity: any) => (
                      <Badge
                        key={amenity}
                        variant="secondary"
                        className="text-xs"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-semibold">
                        ${hotel.price}
                      </span>
                      <span className="text-muted-foreground">/night</span>
                    </div>
                    <Button className="luxury-gradient border-0">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-16 flex justify-center">
        <Link to="/hotels">
          <Button>View All</Button>
        </Link>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl mb-4">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore the world's most sought-after locations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {locations.map((location: any, index: number) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className="bg-card rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-semibold text-lg group-hover:text-[var(--luxury-gold)] transition-colors">
                    {location.name}
                  </h3>
                  <p className="text-muted-foreground">{location.country}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {location.hotels} hotels
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
