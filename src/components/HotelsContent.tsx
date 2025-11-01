import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { ImageWithFallback } from "./ImageWithFallback";
import {
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Star,
  Heart,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell,
  Coffee,
  Bed,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useGetAllHotelsQuery } from "@/lib/api";
import { Link } from "react-router";

// interface HotelsPageProps {
//   onPageChange: (page: string) => void;
// }

// export function HotelsPage({ onPageChange }: HotelsPageProps) {
export function HotelsContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([100, 800]);
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: hotels = [],
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
  } = useGetAllHotelsQuery(undefined);

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

  const amenityOptions = [
    "Wifi",
    "Spa",
    "Pool",
    "Restaurant",
    "Gym",
    "Parking",
    "Beach",
    "Ski",
    "Fireplace",
    "Bar",
    "Concierge",
  ];

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          min={0}
          step={50}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Rating</h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Checkbox
                checked={selectedRating === rating.toString()}
                onCheckedChange={() => setSelectedRating(rating.toString())}
              />
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1">{rating}+</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Amenities</h3>
        <div className="space-y-2">
          {amenityOptions.map((amenity) => {
            const IconComponent =
              amenityIcons[amenity as keyof typeof amenityIcons];
            return (
              <label
                key={amenity}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={() => handleAmenityToggle(amenity)}
                />
                <IconComponent className="w-4 h-4" />
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  const HotelCard = ({ hotel, index }: { hotel: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        className={`overflow-hidden hover:shadow-2xl transition-all duration-300 group ${
          viewMode === "list" ? "flex flex-row" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            viewMode === "list" ? "w-80 flex-shrink-0" : ""
          }`}
        >
          <ImageWithFallback
            src={hotel.images[0]}
            alt={hotel.name}
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
              viewMode === "list" ? "w-full h-full" : "w-full h-64"
            }`}
          />
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-black/70 text-white border-0">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {hotel.rating}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6 flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-playfair text-xl group-hover:text-[var(--luxury-gold)] transition-colors">
              {hotel.name}
            </h3>
            <div className="text-right">
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
              ({hotel.reviews.length} reviews)
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {hotel.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity: any) => {
              const IconComponent =
                amenityIcons[amenity.name as keyof typeof amenityIcons];
              return (
                <Badge
                  key={amenity.name}
                  variant="secondary"
                  className="text-xs flex items-center"
                >
                  {IconComponent ? (
                    <IconComponent className="w-3 h-3 mr-1" />
                  ) : null}
                  {amenity.name}
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
            <Button
              asChild
              variant="outline"
              className="flex-1"
              //   onClick={() => onPageChange('hotel-detail')}
            >
              <Link to={`/hotels/${hotel._id}`}>
                View Details
              </Link>
            </Button>
            <Button
              className="flex-1 luxury-gradient border-0"
              //   onClick={() => onPageChange('booking')}
            >
              <Link to={`/hotels/${hotel._id}/book`}>
                Book Now
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="py-8 bg-gray-400 pt-30">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-playfair text-3xl md:text-4xl mb-4">
            Find Your Perfect Stay
          </h1>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search hotels, locations..."
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="sm">
                  Clear All
                </Button>
              </div>
              <FilterSidebar />
            </Card>
          </div>

          {/* Mobile Filter Sheet */}
          <Sheet>
            <SheetTrigger
              asChild
              className="lg:hidden fixed bottom-4 right-4 z-50"
            >
              <Button className="rounded-full w-14 h-14 luxury-gradient border-0">
                <Filter className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="mt-6">
                <h2 className="font-semibold text-lg mb-6">Filters</h2>
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>

          {/* Hotels Grid/List */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {hotels.length} hotels found
              </p>
            </div>

            <div
              className={`gap-6 ${
                viewMode === "grid"
                  ? "grid grid-cols-1 xl:grid-cols-2"
                  : "space-y-6"
              }`}
            >
              {hotels.map((hotel: any, index: number) => (
                <HotelCard key={hotel._id} hotel={hotel} index={index} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
