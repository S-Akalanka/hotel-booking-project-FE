import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './ImageWithFallback';
import { 
  MapPin, 
  Star, 
  Heart, 
  Share, 
  Wifi, 
  Car, 
  Utensils, 
  Waves, 
  Dumbbell, 
  Coffee,
  Calendar as CalendarIcon,
  Users,
  Check,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  Phone
} from 'lucide-react';
import { motion } from 'motion/react';

// interface HotelDetailPageProps {
//   onPageChange: (page: string) => void;
// }

// export function HotelDetailPage({ onPageChange }: HotelDetailPageProps) {
export function HotelDetailsContent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState('2');
  const [rooms, setRooms] = useState('1');

  const hotel = {
    id: 1,
    name: 'The Grand Palace Hotel',
    location: 'Manhattan, New York',
    rating: 4.9,
    reviews: 234,
    price: 450,
    originalPrice: 520,
    description: 'Experience unparalleled luxury at The Grand Palace Hotel, located in the heart of Manhattan. Our 5-star property offers world-class amenities, exceptional service, and breathtaking city views.',
    images: [
      'https://images.unsplash.com/photo-1647249893022-9287c83b8cc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwbW9kZXJufGVufDF8fHx8MTc1ODc1ODg2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1685592437742-3b56edb46b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb20lMjBzdWl0ZXxlbnwxfHx8fDE3NTg3NjI0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1631655376078-b6319604bd17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NTg4NDc1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1667235195726-a7c440bca9bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHNwYSUyMHdlbGxuZXNzfGVufDF8fHx8MTc1ODc2ODM1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1729606188713-814d1b7bf893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBvb2wlMjBsdXh1cnklMjB2aWV3fGVufDF8fHx8MTc1ODg0NzU4MXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    amenities: [
      { name: 'Free WiFi', icon: Wifi },
      { name: 'Spa & Wellness', icon: Waves },
      { name: 'Swimming Pool', icon: Waves },
      { name: 'Fine Dining', icon: Utensils },
      { name: 'Fitness Center', icon: Dumbbell },
      { name: 'Valet Parking', icon: Car },
      { name: 'Room Service', icon: Coffee },
      { name: 'Concierge', icon: Users }
    ],
    highlights: [
      'Prime Manhattan location',
      'Michelin-starred restaurant',
      'Rooftop infinity pool',
      '24/7 concierge service',
      'Luxury spa treatments',
      'Business center'
    ],
    policies: {
      checkIn: '3:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
      pets: 'Pet-friendly (additional fees apply)'
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 1;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const roomCount = parseInt(rooms);
    return hotel.price * nights * roomCount;
  };

  return (
    <div className="min-h-screen bg-background ">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-25">
        <Button 
          variant="ghost" 
        //   onClick={() => onPageChange('hotels')}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Hotels
        </Button>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96 lg:h-[500px]">
          {/* Main Image */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-xl">
            <ImageWithFallback
              src={hotel.images[currentImageIndex]}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={previousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {hotel.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="hidden lg:grid grid-rows-2 gap-4">
            {hotel.images.slice(1, 3).map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl cursor-pointer">
                <ImageWithFallback
                  src={image}
                  alt={`${hotel.name} ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onClick={() => setCurrentImageIndex(index + 1)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hotel Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="font-playfair text-3xl md:text-4xl mb-2">{hotel.name}</h1>
                  <p className="text-muted-foreground flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">{hotel.rating}</span>
                  <span className="ml-1 text-muted-foreground">({hotel.reviews} reviews)</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Excellent Rating
                </Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-playfair text-2xl mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                    <amenity.icon className="w-5 h-5 text-[var(--luxury-gold)]" />
                    <span className="text-sm">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="font-playfair text-2xl mb-6">Hotel Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hotel.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hotel Policies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="font-playfair text-2xl mb-6">Hotel Policies</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[var(--luxury-gold)]" />
                  <div>
                    <span className="font-semibold">Check-in:</span> {hotel.policies.checkIn} | 
                    <span className="font-semibold"> Check-out:</span> {hotel.policies.checkOut}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[var(--luxury-gold)]" />
                  <span>{hotel.policies.cancellation}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-[var(--luxury-gold)]" />
                  <span>{hotel.policies.pets}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      {hotel.originalPrice > hotel.price && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${hotel.originalPrice}
                        </span>
                      )}
                      <span className="text-3xl font-semibold">${hotel.price}</span>
                      <span className="text-muted-foreground">/ night</span>
                    </div>
                    {hotel.originalPrice > hotel.price && (
                      <Badge className="bg-red-100 text-red-800 border-red-200 mt-1">
                        Save ${hotel.originalPrice - hotel.price} per night
                      </Badge>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Check-in</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? checkIn.toDateString() : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Check-out</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? checkOut.toDateString() : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Guests and Rooms */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Guests</label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Rooms</label>
                    <Select value={rooms} onValueChange={setRooms}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Room</SelectItem>
                        <SelectItem value="2">2 Rooms</SelectItem>
                        <SelectItem value="3">3 Rooms</SelectItem>
                        <SelectItem value="4">4 Rooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price Breakdown */}
                {checkIn && checkOut && (
                  <div className="space-y-3 p-4 bg-secondary rounded-lg">
                    <div className="flex justify-between">
                      <span>${hotel.price} × {calculateNights()} nights × {rooms} rooms</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>${Math.round(calculateTotal() * 0.12)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${calculateTotal() + Math.round(calculateTotal() * 0.12)}</span>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <Button 
                  className="w-full luxury-gradient border-0 h-12"
                //   onClick={() => onPageChange('booking')}
                >
                  Book Now
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-1" />
                    Need help? Call us at (555) 123-4567
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}