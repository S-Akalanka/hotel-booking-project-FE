import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { ImageWithFallback } from "./ImageWithFallback";
import { bookings } from '@/data';
import { 
  User, 
  Settings, 
  Calendar, 
  CreditCard, 
  MapPin, 
  Star, 
  Download,
  Edit,
  Bell,
  Shield,
  Eye,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { motion } from 'motion/react';

// interface AccountPageProps {
//   onPageChange: (page: string) => void;
// }

// export function AccountContent ({ onPageChange }: AccountPageProps) {
export function AccountContent () {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    address: '123 Main St, New York, NY 10001',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543'
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants = {
      paid: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      refunded: 'bg-gray-100 text-gray-800 border-gray-200',
      failed: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gray-500 py-12 pt-32">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-6"
          >
            <Avatar className="w-24 h-24 max-[748px]:w-18 max-[748px]:h-18">
              <AvatarImage src="" />
              <AvatarFallback className="text-4xl bg-gray-300 text-black max-[748px]:text-2xl" >
                {userInfo.firstName[0]}{userInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl max-[748px]:text-2xl mb-2">
                Welcome back, {userInfo.firstName}
              </h1 >
              <p className="text-black max-[748px]:text-[15px]">
                Manage your bookings, preferences, and account settings
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>My Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Personal Information</CardTitle>
                    <Button
                      variant="outline"
                      onClick={() => setEditMode(!editMode)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {editMode ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                        disabled={!editMode}
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={userInfo.dateOfBirth}
                      onChange={(e) => setUserInfo({...userInfo, dateOfBirth: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={userInfo.address}
                      onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    <Input
                      value={userInfo.emergencyContact}
                      onChange={(e) => setUserInfo({...userInfo, emergencyContact: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  
                  {editMode && (
                    <div className="flex space-x-3">
                      <Button className="luxury-gradient border-0">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
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
                    {bookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="p-6 border rounded-xl hover:shadow-lg transition-shadow"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                          <div className="flex space-x-4">
                            <ImageWithFallback
                              src={booking.image}
                              alt={booking.hotel}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{booking.hotel}</h3>
                              <p className="text-muted-foreground flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {booking.location}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {booking.roomType} • {booking.guests} guests • {booking.rooms} room
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col lg:items-end space-y-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(booking.status)}
                              {getStatusBadge(booking.status)}
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-lg">${booking.amount}</div>
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
                              <div className="font-medium">{new Date(booking.checkIn).toDateString()}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Check-out:</span>
                              <div className="font-medium">{new Date(booking.checkOut).toDateString()}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Booking ID:</span>
                              <div className="font-medium">{booking.id}</div>
                            </div>
                            {booking.rating && (
                              <div>
                                <span className="text-muted-foreground">Rating:</span>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                  <span className="font-medium">{booking.rating}</span>
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
                            {booking.status === 'confirmed' && (
                              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
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
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Booking confirmations</h4>
                      <p className="text-sm text-muted-foreground">Get notified about booking updates</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Special offers</h4>
                      <p className="text-sm text-muted-foreground">Receive deals and promotions</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Trip reminders</h4>
                      <p className="text-sm text-muted-foreground">Get reminded about upcoming trips</p>
                    </div>
                    <Button variant="outline" size="sm">Disabled</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Change password</h4>
                      <p className="text-sm text-muted-foreground">Update your account password</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-factor authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Login history</h4>
                      <p className="text-sm text-muted-foreground">View recent account access</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">•••• •••• •••• 4242</h4>
                        <p className="text-sm text-muted-foreground">Expires 12/26</p>
                      </div>
                      <Badge>Primary</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Download my data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Export booking history
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete account
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}