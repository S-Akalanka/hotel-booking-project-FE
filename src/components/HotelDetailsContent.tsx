import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./ImageWithFallback";
import { iconMap } from "@/utils/iconMap";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { useGetHotelByIdQuery } from "@/lib/api";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Star,
  Shield,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setBookingDetails } from "@/lib/features/bookingSlice";
import GradientText from "./ui/GradientText/GradientText";

export function HotelDetailsContent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setcheckInDate] = useState<Date>();
  const [checkOutDate, setcheckOutDate] = useState<Date>();
  const [noOfGuests, setnoOfGuests] = useState("2");
  const [rooms, setRooms] = useState("1");

  const { _id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(_id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    dispatch(
      setBookingDetails({
        checkInDate: checkInDate ? checkInDate.toISOString() : null,
        checkOutDate: checkOutDate ? checkOutDate.toISOString() : null,
        rooms,
        noOfGuests,
      }),
    );
    navigate(`book`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            Loading
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-destructive font-medium">Unable to load hotel</p>
          <p className="text-muted-foreground text-sm">
            {(error as any)?.message || "Something went wrong."}
          </p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No hotel found.</p>
      </div>
    );
  }

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  const previousImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + hotel.images.length) % hotel.images.length,
    );
  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };
  const calculateTotal = () =>
    hotel.price * calculateNights() * parseInt(rooms);
  const taxes = Math.round(calculateTotal() * 0.12);
  const grandTotal = calculateTotal() + taxes;

  const CARD_W = 360;

  return (
    <div className="min-h-screen">
      <div className="bg-gray-500 py-12 pt-16"></div>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div
            className="flex items-stretch gap-5"
            style={{ height: "clamp(280px, 47vw, 600px)" }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-muted flex-1 min-w-0">
              <ImageWithFallback
                src={hotel.images[currentImageIndex]}
                alt={hotel.name}
                className="w-full h-full object-cover object-center transition-transform duration-500"
              />

              {/* Prev / Next */}
              <button
                onClick={previousImage}
                className="absolute left-3 top-1/2  transform transition-transform duration-300 hover:scale-110 -translate-y-1/2 w-12 h-12 rounded-full bg-transparent shadow flex items-center justify-center"
                aria-label="Previous"
              >
                <ChevronLeft className="h-12 w-12 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2   transform transition-transform duration-300 hover:scale-110 -translate-y-1/2 w-12 h-12 rounded-full bg-transparent shadow flex items-center justify-center"
                aria-label="Next"
              >
                <ChevronRight className="h-12 w-12 text-white" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {hotel.images.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentImageIndex === i
                        ? "w-5 bg-white"
                        : "w-1.5 bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="hidden lg:flex flex-col shrink-0"
              style={{ width: `${CARD_W}px` }}
            >
              <Card className="shadow-xl border rounded-2xl overflow-hidden flex flex-col h-full">
                <CardHeader className="pt-6 px-6 shrink-0">
                  <CardTitle className="flex flex-col gap-3">
                    <GradientText
                      colors={[
                        "#544210",
                        "#6e5716",
                        "#8a6f1d",
                        "#a8852a",
                        "#c9a93f",
                        "#e0b940",
                        "#f4c74f",
                      ]}
                      animationSpeed={4}
                      showBorder={false}
                      className="bg-clip-text bg-transparent"
                    >
                      <h1 className="font-playfair font-bold text-3xl md:text-4xl tracking-tight">
                        {hotel.name}
                      </h1>
                    </GradientText>
                    <hr></hr>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-semibold">
                        ${hotel.price}
                      </span>
                      <span className="text-muted-foreground text-sm font-normal">
                        / night
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-6 pb-6 flex flex-col gap-4 flex-1 overflow-auto">
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Check-in",
                        date: checkInDate,
                        setDate: setcheckInDate,
                      },
                      {
                        label: "Check-out",
                        date: checkOutDate,
                        setDate: setcheckOutDate,
                      },
                    ].map(({ label, date, setDate }) => (
                      <div key={label}>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          {label}
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start font-normal h-10 text-sm"
                            >
                              <CalendarIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              <span className="truncate">
                                {date
                                  ? date.toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : "Pick date"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0"
                            align="start"
                            sideOffset={4}
                          >
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(d) => d < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    ))}
                  </div>

                  {/* Guests + Rooms */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Guests",
                        value: noOfGuests,
                        onChange: setnoOfGuests,
                        options: [
                          { v: "1", label: "1 Guest" },
                          { v: "2", label: "2 Guests" },
                          { v: "3", label: "3 Guests" },
                          { v: "4", label: "4 Guests" },
                          { v: "5", label: "5+ Guests" },
                        ],
                      },
                      {
                        label: "Rooms",
                        value: rooms,
                        onChange: setRooms,
                        options: [
                          { v: "1", label: "1 Room" },
                          { v: "2", label: "2 Rooms" },
                          { v: "3", label: "3 Rooms" },
                          { v: "4", label: "4 Rooms" },
                        ],
                      },
                    ].map(({ label, value, onChange, options }) => (
                      <div key={label}>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          {label}
                        </label>
                        <Select value={value} onValueChange={onChange}>
                          <SelectTrigger className="h-10 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {options.map((o) => (
                              <SelectItem key={o.v} value={o.v}>
                                {o.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>

                  {/* Price breakdown */}
                  {checkInDate && checkOutDate && (
                    <div className="rounded-xl bg-secondary/60 p-4 space-y-2 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>
                          ${hotel.price} × {calculateNights()}n × {rooms}r
                        </span>
                        <span className="text-foreground">
                          ${calculateTotal()}
                        </span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Taxes & fees</span>
                        <span className="text-foreground">${taxes}</span>
                      </div>
                      <Separator className="my-1" />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${grandTotal}</span>
                      </div>
                    </div>
                  )}

                  {/* Spacer pushes button to bottom */}
                  <div className="flex-1" />

                  <Button
                    className="w-full h-12 text-sm font-semibold tracking-wide bg-gradient-to-bl from-[#d1aa3f] via-[#e0be5c] to-[#f3d995] rounded-2xl text-black hover:bg-yellow-300/40 transform transition-transform duration-300 hover:scale-103 ease-in-out border-0 shrink-0"
                    onClick={handleProceedToPayment}
                  >
                    Reserve Now
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-3.5 h-3.5 shrink-0" />
                    <span>Secure booking · Free cancellation</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>Need help? Call (555) 123-4567</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="font-playfair text-3xl md:text-4xl font-semibold tracking-tight mb-1.5">
                    {hotel.name}
                  </h1>
                  <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {hotel.location}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 shrink-0"
                >
                  Excellent Rating
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30 fill-muted-foreground/10"}`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-sm">{hotel.rating}</span>
                <span className="text-muted-foreground text-sm">
                  · {hotel.reviews} reviews
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {hotel.description}
              </p>
            </motion.div>

            <Separator />

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h2 className="font-playfair text-2xl font-semibold mb-5">
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-4">
                {hotel.amenities.map((amenity: any, i: number) => {
                  const Icon = iconMap[amenity.icon];
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary shrink-0">
                        {Icon ? (
                          <Icon className="w-4 h-4 text-foreground" />
                        ) : (
                          <span className="text-xs">?</span>
                        )}
                      </span>
                      <span className="leading-snug">{amenity.longName}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg border rounded-2xl overflow-hidden">
                <CardHeader className="pb-3 pt-6 px-6">
                  <CardTitle>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-semibold">
                        ${hotel.price}
                      </span>
                      <span className="text-muted-foreground text-sm font-normal">
                        / night
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Check-in",
                        date: checkInDate,
                        setDate: setcheckInDate,
                      },
                      {
                        label: "Check-out",
                        date: checkOutDate,
                        setDate: setcheckOutDate,
                      },
                    ].map(({ label, date, setDate }) => (
                      <div key={label}>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          {label}
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start font-normal h-10 text-sm"
                            >
                              <CalendarIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              <span className="truncate">
                                {date
                                  ? date.toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : "Pick date"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0"
                            align="start"
                            sideOffset={4}
                          >
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(d) => d < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Guests",
                        value: noOfGuests,
                        onChange: setnoOfGuests,
                        options: [
                          { v: "1", label: "1 Guest" },
                          { v: "2", label: "2 Guests" },
                          { v: "3", label: "3 Guests" },
                          { v: "4", label: "4 Guests" },
                          { v: "5", label: "5+ Guests" },
                        ],
                      },
                      {
                        label: "Rooms",
                        value: rooms,
                        onChange: setRooms,
                        options: [
                          { v: "1", label: "1 Room" },
                          { v: "2", label: "2 Rooms" },
                          { v: "3", label: "3 Rooms" },
                          { v: "4", label: "4 Rooms" },
                        ],
                      },
                    ].map(({ label, value, onChange, options }) => (
                      <div key={label}>
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          {label}
                        </label>
                        <Select value={value} onValueChange={onChange}>
                          <SelectTrigger className="h-10 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {options.map((o) => (
                              <SelectItem key={o.v} value={o.v}>
                                {o.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                  {checkInDate && checkOutDate && (
                    <div className="rounded-xl bg-secondary/60 p-4 space-y-2 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>
                          ${hotel.price} × {calculateNights()}n × {rooms}r
                        </span>
                        <span className="text-foreground">
                          ${calculateTotal()}
                        </span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Taxes & fees</span>
                        <span className="text-foreground">${taxes}</span>
                      </div>
                      <Separator className="my-1" />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${grandTotal}</span>
                      </div>
                    </div>
                  )}
                  <Button
                    className="w-full h-12 text-sm font-semibold bg-gradient-to-bl from-yellow-600/80 via-yellow-400/80 to-white/20 rounded-2xl text-black hover:bg-yellow-300/40 transform transition-transform duration-300 hover:scale-103 ease-in-out border-0"
                    onClick={handleProceedToPayment}
                  >
                    Reserve Now
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-3.5 h-3.5 shrink-0" />
                    <span>Secure booking · Free cancellation</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>Need help? Call (555) 123-4567</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
