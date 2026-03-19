import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./ImageWithFallback";
import { MapPin, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { Badge } from "./ui/badge";

export default function HomeHotelCard(props: any) {
  if (!props.hotel || !props.hotel._id) {
    return null;
  }

  const hotelImage = props.hotel.images?.[0] || props.hotel.image || "";
  const amenities = props.hotel.amenities || [];
  const hasMoreAmenities = amenities.length > 4;

  return (
    <motion.div
      key={props.hotel._id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: props.index * 0.1 }}
    >
      <Card className="py-0 overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={hotelImage}
            alt={props.hotel.name || "Hotel"}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {props.hotel.rating && (
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-black/70 text-white border-0">
                <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                {props.hotel.rating}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="font-playfair text-xl mb-2">
            {props.hotel.name || "Hotel Name"}
          </h3>
          {props.hotel.location && (
            <p className="text-muted-foreground mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {props.hotel.location}
            </p>
          )}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {amenities.slice(0, 4).map((amenity: any, idx: number) => {
                const amenityName =
                  typeof amenity === "string" ? amenity : amenity?.name || "";
                return (
                  <Badge
                    key={amenityName || idx}
                    variant="secondary"
                    className="text-xs"
                  >
                    {amenityName}
                  </Badge>
                );
              })}
              {hasMoreAmenities && (
                <Badge variant={"outline"}>
                  {`+${amenities.length - 4} more`}
                </Badge>
              )}
            </div>
          )}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-semibold">
                ${props.hotel.price || "N/A"}
              </span>
              <span className="text-muted-foreground">/night</span>
            </div>
            <Button
              asChild
              className="bg-gradient-to-br from-[#e0c050] via-[#f1d77a] to-[#fff2b8] text-black 
             hover:from-[#d4b440] hover:via-[#e8cc65] hover:to-[#ffe8a3] 
             shadow-md shadow-yellow-900/20 hover:shadow-yellow-800/30 
             border border-yellow-400/30 hover:border-yellow-500/40 
             transition-all duration-300"
            >
              <Link to={`/hotels/${props.hotel._id}`}>View Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
