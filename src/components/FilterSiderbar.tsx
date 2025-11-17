import { useEffect, useState } from "react";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import {
  Star,
  Wifi,
  Car,
  Utensils,
  Waves,
  Dumbbell,
  Coffee,
  Users,
} from "lucide-react";
import { useDispatch } from "react-redux";
import {
  clearAllFilters,
  setAmenities,
  setMaxPrice,
  setMinPrice,
  setRating,
} from "@/lib/features/searchSlice";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

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

  const dispatch = useDispatch();

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  useEffect(() => {
    if (!priceRange) return;
    dispatch(setMaxPrice(priceRange[1]));
    dispatch(setMinPrice(priceRange[0]));
  }, [priceRange, dispatch]);

  useEffect(() => {
    if (selectedRating == null) return;
    dispatch(setRating(selectedRating));
  }, [selectedRating, dispatch]);

  useEffect(() => {
    dispatch(setAmenities(selectedAmenities));
  }, [selectedAmenities, dispatch]);

  const handleClear = () => {
    setPriceRange([0, 1000]);
    setSelectedRating("");
    setSelectedAmenities([]);
    dispatch(clearAllFilters());
  };

  return (
    <Card className="sticky top-24 h-screen">
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        <Button variant="ghost" size="sm" onClick={handleClear}>
          Clear All
        </Button>
      </div>
      <div className="overflow-y-auto max-h-screen p-4">
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
      </div>
    </Card>
  );
}
