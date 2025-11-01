import { useGetAllLocationsQuery } from "@/lib/api";
import { motion } from "motion/react";

export default function LocationListings(){

  const {
    data: locations = [],
    isLoading: isLocationsLoading,
    isError: isLocationsError,
    error: locationsError,
  } = useGetAllLocationsQuery(undefined);

  if (isLocationsLoading) 
    return <p>Loading...</p>;
  
  if (isLocationsError) 
    return <p>Error</p>;
    
    return(
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
    )
}