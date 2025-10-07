const heroImages: string[] = [
  "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg",
  "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg",
  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.pexels.com/photos/2883047/pexels-photo-2883047.jpeg",
  "https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
  "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661963630748-3de7ab820570?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1584132869994-873f9363a562?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1567636788276-40a47795ba4d?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1678913308053-316cee77afe9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1529316275402-0462fcc4abd6?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const hotels = [
  {
    _id: "1",
    name: "Montmartre Majesty Hotel",
    image: "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg",
    location: "Paris, France",
    rating: 4.7,
    reviews: ["K", "L"],
    price: 160,
    amenities: ["Wifi", "Spa", "Pool", "Restaurant"],
  },
  {
    _id: "2",
    name: "Loire Luxury Lodge",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    location: "Sydney, Australia",
    rating: 4.7,
    reviews: ["K", "L"],
    price: 200,
    amenities: ["Pool", "Beach", "Spa", "Gym"],
  },
  {
    _id: "3",
    name: "Tokyo Tower Inn",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Tokyo, Japan",
    rating: 4.4,
    reviews: ["K", "L"],
    price: 250,
    amenities: ["Ski", "Fireplace", "Spa", "GyRestaurantm"],
  },
];

const destinations = [
  { name: "Paris", country: "France", hotels: 245 },
  { name: "Tokyo", country: "Japan", hotels: 189 },
  { name: "New York", country: "USA", hotels: 312 },
  { name: "London", country: "UK", hotels: 198 },
];

  const bookings = [
    {
      id: 'GPH-2024-001',
      hotel: 'The Grand Palace Hotel',
      location: 'Manhattan, New York',
      image: 'https://images.unsplash.com/photo-1647249893022-9287c83b8cc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwbW9kZXJufGVufDF8fHx8MTc1ODc1ODg2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      checkIn: '2024-12-15',
      checkOut: '2024-12-18',
      guests: 2,
      rooms: 1,
      roomType: 'Deluxe Suite',
      amount: 1356,
      status: 'confirmed',
      paymentStatus: 'paid',
      rating: 4.9
    },
    {
      id: 'OVR-2024-002',
      hotel: 'Ocean View Resort & Spa',
      location: 'Malibu, California',
      image: 'https://images.unsplash.com/photo-1729606188713-814d1b7bf893?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBvb2wlMjBsdXh1cnklMjB2aWV3fGVufDF8fHx8MTc1ODg0NzU4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      checkIn: '2024-11-20',
      checkOut: '2024-11-24',
      guests: 2,
      rooms: 1,
      roomType: 'Ocean View Suite',
      amount: 1520,
      status: 'completed',
      paymentStatus: 'paid',
      rating: 4.8
    },
    {
      id: 'MLR-2024-003',
      hotel: 'Mountain Lodge Retreat',
      location: 'Aspen, Colorado',
      image: 'https://images.unsplash.com/photo-1758612853656-def5033bccb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTg4NDc1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      checkIn: '2024-09-10',
      checkOut: '2024-09-15',
      guests: 4,
      rooms: 2,
      roomType: 'Mountain View Suite',
      amount: 1920,
      status: 'cancelled',
      paymentStatus: 'refunded',
      rating: null
    }
  ];

export { heroImages, hotels, destinations, bookings };
