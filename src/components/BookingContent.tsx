import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { 
  ChevronLeft, 
  Shield, 
  CreditCard, 
  Lock, 
  Check, 
  MapPin, 
  Calendar,
  Users,
  Star,
} from 'lucide-react';
import { motion } from 'motion/react';

// interface BookingPageProps {
//   onPageChange: (page: string) => void;
// }

// export function BookingPage({ onPageChange }: BookingPageProps) {
export function BookingContent() {
  const [step, setStep] = useState(1);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [roomType, setRoomType] = useState('deluxe');
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const hotel = {
    name: 'The Grand Palace Hotel',
    location: 'Manhattan, New York',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1647249893022-9287c83b8cc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwbW9kZXJufGVufDF8fHx8MTc1ODc1ODg2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['Free WiFi', 'Spa', 'Pool', 'Restaurant']
  };

  const bookingDetails = {
    checkIn: new Date('2024-12-15'),
    checkOut: new Date('2024-12-18'),
    guests: 2,
    rooms: 1,
    nights: 3
  };

  const roomTypes = [
    {
      id: 'standard',
      name: 'Standard Room',
      description: 'Comfortable room with city view',
      price: 320,
      features: ['City View', '25 sqm', 'Queen Bed', 'Work Desk']
    },
    {
      id: 'deluxe',
      name: 'Deluxe Suite',
      description: 'Spacious suite with premium amenities',
      price: 450,
      features: ['Park View', '45 sqm', 'King Bed', 'Living Area', 'Minibar']
    },
    {
      id: 'presidential',
      name: 'Presidential Suite',
      description: 'Ultimate luxury with panoramic views',
      price: 850,
      features: ['Panoramic View', '85 sqm', 'King Bed', 'Separate Living Room', 'Butler Service']
    }
  ];

  const selectedRoom = roomTypes.find(room => room.id === roomType);
  const subtotal = selectedRoom ? selectedRoom.price * bookingDetails.nights * bookingDetails.rooms : 0;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const handleStripePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowStripeModal(false);
      setBookingComplete(true);
    }, 3000);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <Card className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-playfair text-2xl mb-4">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Your reservation at {hotel.name} has been confirmed. 
              You'll receive a confirmation email shortly.
            </p>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between">
                <span>Booking ID:</span>
                <span className="font-semibold">#GPH-2024-001</span>
              </div>
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span>{bookingDetails.checkIn.toDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span>{bookingDetails.checkOut.toDateString()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button 
                className="w-full luxury-gradient border-0"
                // onClick={() => onPageChange('account')}
              >
                View My Bookings
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                // onClick={() => onPageChange('home')}
              >
                Return Home
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const StripeCheckoutModal = () => (
    <Dialog open={showStripeModal} onOpenChange={setShowStripeModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Lock className="w-5 h-5 mr-2 text-green-600" />
            Secure Payment
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{selectedRoom?.name} × {bookingDetails.nights} nights</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & fees</span>
                <span>${taxes}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>

          {/* Mock Stripe Form */}
          <div className="space-y-4">
            <div>
              <Label>Card Number</Label>
              <div className="relative">
                <Input placeholder="4242 4242 4242 4242" className="pl-10" />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Expiry</Label>
                <Input placeholder="MM/YY" />
              </div>
              <div>
                <Label>CVC</Label>
                <Input placeholder="123" />
              </div>
            </div>
            <div>
              <Label>Cardholder Name</Label>
              <Input placeholder="John Doe" />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Your payment information is secure and encrypted</span>
          </div>

          <Button 
            className="w-full luxury-gradient border-0"
            onClick={handleStripePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay $${total}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

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
            <h1 className="font-playfair text-2xl md:text-3xl">Complete Your Booking</h1>
            
            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    stepNumber <= step ? 'bg-[var(--luxury-gold)] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-12 h-0.5 ml-2 ${
                      stepNumber < step ? 'bg-[var(--luxury-gold)]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
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
                    <RadioGroup value={roomType} onValueChange={setRoomType} className="space-y-4">
                      {roomTypes.map((room) => (
                        <div key={room.id} className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-secondary">
                          <RadioGroupItem value={room.id} id={room.id} className="mt-1" />
                          <div className="flex-1">
                            <label htmlFor={room.id} className="cursor-pointer">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-semibold">{room.name}</h3>
                                  <p className="text-sm text-muted-foreground">{room.description}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-semibold">${room.price}</div>
                                  <div className="text-sm text-muted-foreground">per night</div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {room.features.map((feature) => (
                                  <Badge key={feature} variant="secondary" className="text-xs">
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

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Guest Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input 
                          value={guestInfo.firstName}
                          onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input 
                          value={guestInfo.lastName}
                          onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Email Address</Label>
                      <Input 
                        type="email"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input 
                        type="tel"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label>Special Requests (Optional)</Label>
                      <textarea 
                        className="w-full p-3 border rounded-lg min-h-[100px] resize-none"
                        value={guestInfo.specialRequests}
                        onChange={(e) => setGuestInfo({...guestInfo, specialRequests: e.target.value})}
                        placeholder="Any special requests or preferences..."
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label htmlFor="terms" className="text-sm">
                        I agree to the hotel's terms and conditions and cancellation policy
                      </label>
                    </div>
                    <div className="flex space-x-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        className="flex-1 luxury-gradient border-0"
                        onClick={() => setStep(3)}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="w-5 h-5" />
                        <label htmlFor="card" className="flex-1 cursor-pointer">
                          Credit or Debit Card
                        </label>
                        <div className="flex space-x-2">
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                        </div>
                      </div>
                    </RadioGroup>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-blue-800">
                        <Shield className="w-5 h-5" />
                        <span className="font-semibold">Secure Payment</span>
                      </div>
                      <p className="text-blue-700 text-sm mt-1">
                        Your payment is protected with 256-bit SSL encryption
                      </p>
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setStep(2)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        className="flex-1 luxury-gradient border-0"
                        onClick={() => setShowStripeModal(true)}
                      >
                        Complete Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
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
                    src={hotel.image}
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
                    <span className="text-sm">{bookingDetails.checkIn.toDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Check-out
                    </span>
                    <span className="text-sm">{bookingDetails.checkOut.toDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      Guests
                    </span>
                    <span className="text-sm">{bookingDetails.guests} guests, {bookingDetails.rooms} room</span>
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
                          <p className="text-sm text-muted-foreground">{selectedRoom.description}</p>
                        </div>
                        <span className="font-semibold">${selectedRoom.price}/night</span>
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
                      <span>${selectedRoom?.price} × {bookingDetails.nights} nights</span>
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
                    {hotel.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <StripeCheckoutModal />
    </div>
  );
}