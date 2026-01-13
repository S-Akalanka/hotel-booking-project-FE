import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./ImageWithFallback";
import { MapPin, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { Badge } from "./ui/badge";

export default function HomeHotelCard(props: any) {
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
            src={props.hotel.images[0]}
            alt={props.hotel.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-black/70 text-white border-0">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {props.hotel.rating}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-playfair text-xl mb-2">{props.hotel.name}</h3>
          <p className="text-muted-foreground mb-4 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {props.hotel.location}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {props.hotel.amenities.slice(0, 4).map((amenity: any) => (
              <Badge key={amenity.name} variant="secondary" className="text-xs">
                {amenity.name}
              </Badge>
            ))}
            <Badge variant={"outline"}>
              {`+${props.hotel.amenities.length - 4} more`}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-semibold">
                ${props.hotel.price}
              </span>
              <span className="text-muted-foreground">/night</span>
            </div>
            <Button
              asChild
              className="bg-gradient-to-br text-black from-yellow-500 via-yellow-300 to-yellow-200
                        hover:from-yellow-600 hover:via-yellow-400 hover:to-yellow-300 transition-all duration-300"
            >
              <Link to={`/hotels/${props.hotel._id}`}>View Details</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
