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
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ChevronLeft, MapPin, Calendar, Users, Star, User } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { useCreateBookingMutation, useGetHotelByIdQuery, useUpdateUserMutation } from "@/lib/api";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nic: string;
  address: string;
}

interface GuestErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  nic?: string;
  address?: string;
}

export function BookingContent() {
  const { _id } = useParams();

  const { data: hotel, isLoading, isError } = useGetHotelByIdQuery(_id);

  const [step, setStep] = useState<1 | 2>(1);
  const [roomType, setRoomType] = useState("deluxe");

  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    address: "",
  });
  const [guestErrors, setGuestErrors] = useState<GuestErrors>({});

  const navigate = useNavigate();

  const [createBooking, { isLoading: isCreateBookingLoading }] =
    useCreateBookingMutation();

  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();

  const { checkInDate, checkOutDate, rooms, noOfGuests } = useSelector(
    (state: any) => state.booking,
  );

  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (user) {
      setGuestInfo((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!checkInDate || !checkOutDate) {
      navigate(`/hotels/${_id}`);
    }
  }, [checkInDate, checkOutDate, navigate, _id]);

  if (isLoading) return <div>Loading hotel...</div>;
  if (isError || !hotel) return <div>Error loading hotel</div>;


  const calculateNights = (
    checkInDate: Date | string | null,
    checkOutDate: Date | string | null,
  ): number => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 0 ? diffDays : 1;
  };

  const bookingDetails = {
    checkIn: checkInDate,
    checkOut: checkOutDate,
    rooms: rooms,
    guests: noOfGuests,
    nights: calculateNights(checkInDate, checkOutDate),
  };

  const selectedRoom = hotel.roomTypes.find(
    (room: any) => room.id === roomType,
  );
  const subtotal = selectedRoom
    ? selectedRoom.price * bookingDetails.nights * bookingDetails.rooms
    : 0;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;


  const validateGuestInfo = (): boolean => {
    const errors: GuestErrors = {};

    if (!guestInfo.firstName.trim())
      errors.firstName = "First name is required.";

    if (!guestInfo.lastName.trim())
      errors.lastName = "Last name is required.";

    if (!guestInfo.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestInfo.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!guestInfo.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(guestInfo.phone)) {
      errors.phone = "Enter a valid phone number.";
    }

    if (!guestInfo.nic.trim()) {
      errors.nic = "NIC is required.";
    } else if (
      !/^(\d{9}[VvXx]|\d{12})$/.test(guestInfo.nic.trim())
    ) {
      errors.nic = "Enter a valid NIC (e.g. 901234567V or 199012345678).";
    }

    if (!guestInfo.address.trim())
      errors.address = "Address is required.";

    setGuestErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleGuestFieldChange = (field: keyof GuestInfo, value: string) => {
    setGuestInfo((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (guestErrors[field]) {
      setGuestErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleConfirmAndBook = async () => {
    if (!validateGuestInfo()) return;
    if (!userId) return;

    const room = hotel.roomTypes.find((room: any) => room.id === roomType);
    if (!room) return console.error("Selected room not found");

    try {
      // 1. Update user profile
      await updateUser({
        firstName: guestInfo.firstName,
        lastName: guestInfo.lastName,
        email: guestInfo.email,
        phoneNumber: guestInfo.phone,
        address: guestInfo.address,
        nic: guestInfo.nic,
      }).unwrap();

      // 2. Create booking 
      const newBooking = await createBooking({
        userId: userId,
        hotelId: hotel._id,
        checkIn: new Date(bookingDetails.checkIn).toISOString(),
        checkOut: new Date(bookingDetails.checkOut).toISOString(),
        noOfRooms: parseInt(rooms),
        roomType: roomType,
        price: total,
        noOfGuests: parseInt(noOfGuests),
        status: "CONFIRMED",
        paymentStatus: "PENDING",
      }).unwrap();

      navigate(`/checkout/${newBooking._id}`);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const isSubmitting = isUpdateUserLoading || isCreateBookingLoading;


  const BookingSummary = () => (
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
                {bookingDetails.guests} guests, {bookingDetails.rooms} room
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
  );


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b pt-25 booking-background">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() =>
              step === 2 ? setStep(1) : navigate(`/hotels/${_id}`)
            }
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {step === 2 ? "Back to Room Selection" : "Back to Hotel"}
          </Button>

          <div className="flex items-center justify-between">
            <h1 className="font-playfair text-2xl md:text-3xl">
              Complete Your Booking
            </h1>

            {/* Step indicator */}
            <div className="hidden md:flex items-center space-x-4">
              {[
                { num: 1, label: "Room" },
                { num: 2, label: "Guest Details" },
              ].map(({ num, label }) => (
                <div key={num} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      num <= step
                        ? "bg-[var(--luxury-gold)] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {num}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {label}
                  </span>
                  {num < 2 && (
                    <div
                      className={`w-10 h-0.5 ml-3 ${
                        num < step
                          ? "bg-[var(--luxury-gold)]"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* ── STEP 1 : Select Room ── */}
            {step === 1 && (
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
                            <label
                              htmlFor={type.id}
                              className="cursor-pointer"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-semibold">
                                    {type.name}
                                  </h3>
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
                      onClick={() => setStep(2)}
                    >
                      Continue to Guest Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* ── STEP 2 : Guest Details ── */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Guest Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Name row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="firstName">
                          First Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={guestInfo.firstName}
                          onChange={(e) =>
                            handleGuestFieldChange("firstName", e.target.value)
                          }
                          className={guestErrors.firstName ? "border-destructive" : ""}
                        />
                        {guestErrors.firstName && (
                          <p className="text-xs text-destructive">
                            {guestErrors.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="lastName">
                          Last Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={guestInfo.lastName}
                          onChange={(e) =>
                            handleGuestFieldChange("lastName", e.target.value)
                          }
                          className={guestErrors.lastName ? "border-destructive" : ""}
                        />
                        {guestErrors.lastName && (
                          <p className="text-xs text-destructive">
                            {guestErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* NIC — mandatory */}
                    <div className="space-y-1">
                      <Label htmlFor="nic">
                        NIC (National Identity Card){" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="nic"
                        placeholder="901234567V  or  199012345678"
                        value={guestInfo.nic}
                        onChange={(e) =>
                          handleGuestFieldChange("nic", e.target.value)
                        }
                        className={guestErrors.nic ? "border-destructive" : ""}
                      />
                      {guestErrors.nic ? (
                        <p className="text-xs text-destructive">
                          {guestErrors.nic}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Old format: 9 digits + V/X &nbsp;|&nbsp; New format:
                          12 digits
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <Label htmlFor="email">
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={guestInfo.email}
                        onChange={(e) =>
                          handleGuestFieldChange("email", e.target.value)
                        }
                        className={guestErrors.email ? "border-destructive" : ""}
                      />
                      {guestErrors.email && (
                        <p className="text-xs text-destructive">
                          {guestErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <Label htmlFor="phone">
                        Phone Number{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+94 77 123 4567"
                        value={guestInfo.phone}
                        onChange={(e) =>
                          handleGuestFieldChange("phone", e.target.value)
                        }
                        className={guestErrors.phone ? "border-destructive" : ""}
                      />
                      {guestErrors.phone && (
                        <p className="text-xs text-destructive">
                          {guestErrors.phone}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="space-y-1">
                      <Label htmlFor="address">
                        Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street, Colombo"
                        value={guestInfo.address}
                        onChange={(e) =>
                          handleGuestFieldChange("address", e.target.value)
                        }
                        className={guestErrors.address ? "border-destructive" : ""}
                      />
                      {guestErrors.address && (
                        <p className="text-xs text-destructive">
                          {guestErrors.address}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setStep(1)}
                        disabled={isSubmitting}
                      >
                        Back
                      </Button>
                      <Button
                        className="flex-1 luxury-gradient border-0"
                        onClick={handleConfirmAndBook}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing…" : "Confirm & Book"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* ── Booking Summary (sidebar) ── */}
          <BookingSummary />
        </div>
      </div>
    </div>
  );
}