import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { ImageWithFallback } from "../components/ImageWithFallback";
import {
  ChevronLeft,
  MapPin,
  Calendar,
  Users,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { useCreateBookingMutation, useGetHotelByIdQuery } from "@/lib/api";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";

export function BookingContent() {
  const { _id } = useParams();

  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(_id);

  const [roomType, setRoomType] = useState("deluxe");

  const navigate = useNavigate();

  const [createBooking, { isLoading: isCreateBookingLoading }] =
    useCreateBookingMutation();

  const { checkInDate, checkOutDate, rooms, noOfGuests } = useSelector(
    (state: any) => state.booking
  );

  useEffect(() => {
    if (!checkInDate || !checkOutDate) {
      navigate(`/hotels/${_id}`);
    }
  }, [checkInDate, checkOutDate, navigate, _id]);

  if (isLoading) return <div>Loading hotel...</div>;
  if (isError || !hotel) return <div>Error loading hotel</div>;

  const calculateNights = (
    checkInDate: Date | string | null,
    checkOutDate: Date | string | null
  ): number => {
    if (!checkInDate || !checkOutDate) return 0;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Normalize both dates to midnight to ignore hours/minutes/seconds
    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);

    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // Return at least 0 (avoid negatives)
    return diffDays > 0 ? diffDays : 0;
  };

  const { user } = useUser();
  const userId = user?.id;

  const bookingDetails = {
    checkIn: checkInDate,
    checkOut: checkOutDate,
    rooms: rooms,
    guests: noOfGuests,
    nights: calculateNights(checkInDate, checkOutDate),
  };

  const handleBook = async () => {
    if (!userId) return;
    const room = hotel.roomTypes.find((room: any) => room.id === roomType);
    if (!room) return console.error("Selected room not found");

    try {
      await createBooking({
        userId: userId,
        hotelId: hotel._id,
        checkIn: new Date(bookingDetails.checkIn).toDateString(),
        checkOut: new Date(bookingDetails.checkOut).toDateString(),
        noOfRooms: parseInt(rooms),
        roomType: roomType,
        price: room.price,
        noOfGuests: parseInt(noOfGuests),
      }).unwrap();
      console.log("Booking created!");
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const selectedRoom = hotel.roomTypes.find(
    (room: any) => room.id === roomType
  );
  const subtotal = selectedRoom
    ? selectedRoom.price * bookingDetails.nights * bookingDetails.rooms
    : 0;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b pt-25 bg-gray-400">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            // onClick={() => onPageChange('hotel-detail')}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Hotel
          </Button>

          <div className="flex items-center justify-between">
            <h1 className="font-playfair text-2xl md:text-3xl">
              Complete Your Booking
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Select Room Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={roomType}
                    onValueChange={setRoomType}
                    className="space-y-4"
                  >
                    {hotel.roomTypes.map((type: any) => (
                      <div
                        key={type.id}
                        className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-secondary"
                      >
                        <RadioGroupItem
                          value={type.id}
                          id={type.id}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label htmlFor={type.id} className="cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold">{type.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {type.description}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-semibold">
                                  ${type.price}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  per night
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {type.features.map((feature: string) => (
                                <Badge
                                  key={feature}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button
                    className="w-full mt-6 luxury-gradient border-0"
                    onClick={async () => {
                      await handleBook();
                    }}
                  >
                    Continue to Guest Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Booking Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Hotel Info */}
                <div className="flex space-x-3">
                  <ImageWithFallback
                    src={hotel.images[0]}
                    alt={hotel.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{hotel.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {hotel.location}
                    </p>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-sm ml-1">{hotel.rating}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Booking Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Check-in
                    </span>
                    <span className="text-sm">
                      {new Date(bookingDetails.checkIn).toDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Check-out
                    </span>
                    <span className="text-sm">
                      {new Date(bookingDetails.checkOut).toDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      Guests
                    </span>
                    <span className="text-sm">
                      {bookingDetails.guests} guests, {bookingDetails.rooms}{" "}
                      room
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Room Type */}
                {selectedRoom && (
                  <div>
                    <h4 className="font-semibold mb-2">Room Type</h4>
                    <div className="p-3 bg-secondary rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{selectedRoom.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            {selectedRoom.description}
                          </p>
                        </div>
                        <span className="font-semibold">
                          ${selectedRoom.price}/night
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Price Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>
                        ${selectedRoom?.price} × {bookingDetails.nights} nights
                      </span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>${taxes}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="font-semibold mb-2">Included Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity: any) => (
                      <Badge
                        key={amenity.name}
                        variant="secondary"
                        className="text-xs"
                      >
                        {amenity.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
