import { useGetAllLocationsQuery } from "@/lib/api";
import { motion } from "motion/react";
import { Skeleton } from "./ui/skeleton";
import ErrorMessage from "./ErrorMessage";

export default function LocationListings(){

  const {
    data: locations = [],
    isLoading: isLocationsLoading,
    isError: isLocationsError,
    error: locationsError,
    refetch,
  } = useGetAllLocationsQuery(undefined);

  if (isLocationsError) {
    return (
      <ErrorMessage
        title="Failed to load destinations"
        message={
          locationsError && typeof locationsError === "object" && "data" in locationsError
            ? String(locationsError.data || "Unable to fetch destinations. Please try again.")
            : "Unable to fetch popular destinations. Please check your connection and try again."
        }
        onRetry={() => refetch()}
      />
    );
  }
    
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
            {isLocationsLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="text-center">
                  <div className="bg-card rounded-xl p-6">
                    <Skeleton className="h-6 w-24 mx-auto mb-2" />
                    <Skeleton className="h-4 w-16 mx-auto mb-1" />
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </div>
                </div>
              ))
            ) : (
              locations.slice(0,4).map((location: any, index: number) => (
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
              ))
            )}
          </div>
        </div>
      </section>
    )
}