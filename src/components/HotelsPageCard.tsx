import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./ImageWithFallback";
import { Badge } from "./ui/badge";
import { Car, Coffee, Dumbbell, Heart, MapPin, Star, Users, Utensils, Waves, Wifi } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function HotelsPageCard(props: any) {
  const { hotel, index } = props;

  const amenityIcons = {
    Wifi: Wifi,
    Spa: Waves,
    Pool: Waves,
    Restaurant: Utensils,
    Gym: Dumbbell,
    Parking: Car,
    Beach: Waves,
    Ski: Car,
    Fireplace: Coffee,
    Bar: Coffee,
    Concierge: Users,
  };

  // Handle different data structures
  const hotelImage = hotel.image || (hotel.images && hotel.images[0]);
  const reviewsCount = typeof hotel.reviews === "number" ? hotel.reviews : (hotel.reviews?.length || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col lg:flex-row">
        <div className="relative overflow-hidden w-full h-64 lg:w-80 lg:flex-shrink-0">
          <ImageWithFallback
            src={hotelImage}
            alt={hotel.name}
            className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-black/70 text-white border-0">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {hotel.rating}
            </Badge>
          </div>
          {hotel.originalPrice > hotel.price && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-500 text-white border-0">
                Save ${hotel.originalPrice - hotel.price}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6 flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-playfair text-xl group-hover:text-[var(--luxury-gold)] transition-colors">
              {hotel.name}
            </h3>
            <div className="text-right">
              {hotel.originalPrice > hotel.price && (
                <div className="text-sm text-muted-foreground line-through">
                  ${hotel.originalPrice}
                </div>
              )}
              <div className="text-2xl font-semibold">${hotel.price}</div>
              <div className="text-sm text-muted-foreground">per night</div>
            </div>
          </div>

          <p className="text-muted-foreground mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {hotel.location}
          </p>

          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(hotel.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              ({reviewsCount} reviews)
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{hotel.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity: any, idx: number) => {
              // Handle both string and object formats
              const amenityName = typeof amenity === "string" ? amenity : amenity.name;
              const IconComponent = amenityIcons[amenityName as keyof typeof amenityIcons];
              return (
                <Badge
                  key={amenityName || idx}
                  variant="secondary"
                  className="text-xs flex items-center"
                >
                  {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
                  {amenityName}
                </Badge>
              );
            })}
            {hotel.amenities.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{hotel.amenities.length - 4} more
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link to={`/hotels/${hotel._id}`}>Book Now</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
