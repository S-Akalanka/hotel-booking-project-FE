import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./ImageWithFallback";
import {
  MapPin,
  Star,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useGetuserPastBookingsQuery } from "@/lib/api";

export function AccountBooking() {
  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useGetuserPastBookingsQuery(undefined);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: "bg-green-100 text-green-800 border-green-200",
      completed: "bg-blue-100 text-blue-800 border-blue-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };

    return (
      <Badge
        className={
          variants[status as keyof typeof variants] || variants.pending
        }
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants = {
      paid: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      refunded: "bg-gray-100 text-gray-800 border-gray-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <Badge
        className={
          variants[status as keyof typeof variants] || variants.pending
        }
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {bookings.map((booking:any, index:number) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 border rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex space-x-4">
                    <ImageWithFallback
                      src={booking.hotelId.images[0]}
                      alt={booking.hotelId.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{booking.hotelId.name}</h3>
                      <p className="text-muted-foreground flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {booking.hotelId.location}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.roomType} • {booking.noOfGuests} guests •{" "}
                        {booking.noOfRooms} room
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:items-end space-y-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(booking.status)}
                      {getStatusBadge(booking.status)}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">
                        ${booking.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {getPaymentStatusBadge(booking.paymentStatus)}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Check-in:</span>
                      <div className="font-medium">
                        {new Date(booking.checkIn).toDateString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Check-out:</span>
                      <div className="font-medium">
                        {new Date(booking.checkOut).toDateString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Booking ID:</span>
                      <div className="font-medium">{booking._id.slice(0, 11)}...</div>
                    </div>
                    {booking.hotelId.rating && (
                      <div>
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{booking.hotelId.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Invoice
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                    {booking.status.toLowerCase() === "confirmed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
