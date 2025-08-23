// Results.tsx (updated)

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Thermometer, ArrowLeft, Download, Share2, Bookmark, Calendar, Users, Car, Train, Plane, Bell, Settings, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import TravelCard from "@/components/TravelCard";
import { useTrip } from "@/context/TripContext"; // Import context

interface TripData {
  startLocation: string;
  destination: string;
  travelMode: string;
  departureDate: string;
  travelers: string;
  timestamp: string;
}

const Results = () => {
  const { currentTrip, saveCurrentTrip } = useTrip(); // Get current trip
  const [isSaved, setIsSaved] = useState(false);

  const tripData = currentTrip;

  // Button handler functions
  const handleSave = () => {
    if (!tripData) return;
    if (!isSaved) {
      saveCurrentTrip(); // Saves to savedTrips list
      setIsSaved(true);
    } else {
      alert(`Trip to ${tripData.destination} is already saved.`);
    }
  };

  const handleShare = () => {
    if (!tripData) return;
    const shareText = `Check out my trip plan: ${tripData.startLocation} to ${tripData.destination} on ${formatDate(tripData.departureDate)}!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Travel Plan',
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText + ' ' + window.location.href)
        .then(() => alert('🔗 Trip details copied to clipboard!'))
        .catch(() => alert('📤 Sharing failed.'));
    }
  };

  const handleExport = () => {
    if (!tripData) return;
    
    const exportData = {
      trip: tripData,
      generatedAt: new Date().toISOString(),
      summary: `Trip from ${tripData.startLocation} to ${tripData.destination}`,
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `trip-${tripData.destination.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('📥 Trip plan exported successfully!');
  };

  // Helper functions (unchanged)
  const getTravelModeIcon = (mode: string) => {
    switch (mode?.toLowerCase()) {
      case 'car': return <Car className="h-4 w-4" />;
      case 'train': return <Train className="h-4 w-4" />;
      case 'flight': return <Plane className="h-4 w-4" />;
      default: return <Car className="h-4 w-4" />;
    }
  };

  const getTravelModeLabel = (mode: string) => {
    switch (mode?.toLowerCase()) {
      case 'car': return 'Car';
      case 'train': return 'Train';
      case 'flight': return 'Flight';
      default: return 'Car';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMockTravelInfo = (mode: string) => {
    switch (mode?.toLowerCase()) {
      case 'flight': return { distance: '500-2000 km', time: '1-4 hours' };
      case 'train': return { distance: '200-800 km', time: '2-6 hours' };
      case 'car':
      default: return { distance: '150-500 km', time: '2-8 hours' };
    }
  };

  // If no trip data, show message
  if (!tripData) {
    return (
      <div className="min-h-screen travel-gradient-bg">
        <Navbar />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">No Trip Data Found</h1>
            <p className="text-muted-foreground mb-8">Please create a trip plan first.</p>
            <Link to="/dashboard">
              <Button className="travel-button">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const mockTravelInfo = getMockTravelInfo(tripData.travelMode);

  // Dummy data (unchanged)
  const weather = {
    temperature: "22°C",
    condition: "Sunny",
    humidity: "65%"
  };

  const hotels = [
    {
      title: `Premium Hotel in ${tripData.destination}`,
      description: `Luxury accommodation in the heart of ${tripData.destination} with exceptional service and amenities.`,
      location: `Downtown ${tripData.destination}`,
      rating: 4.8,
      price: "$350/night",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
      contact: "+1 (555) 123-4567",
      website: "https://hotel-example.com"
    },
    {
      title: `Boutique Stay ${tripData.destination}`,
      description: `Charming boutique hotel with personalized service and local charm in ${tripData.destination}.`,
      location: `Central ${tripData.destination}`,
      rating: 4.7,
      price: "$280/night",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
      contact: "+1 (555) 987-6543",
      website: "https://boutique-example.com"
    }
  ];

  const restaurants = [
    {
      title: `Local Favorite in ${tripData.destination}`,
      description: `Authentic local cuisine and traditional dishes that define ${tripData.destination}'s culinary scene.`,
      location: `Historic District, ${tripData.destination}`,
      rating: 4.5,
      price: "$50-80",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=300&fit=crop",
      contact: "+1 (555) 456-7890",
      openHours: "11:00 AM - 9:30 PM"
    },
    {
      title: `Fine Dining ${tripData.destination}`,
      description: `Upscale dining experience featuring modern cuisine with local ingredients from ${tripData.destination}.`,
      location: `Uptown ${tripData.destination}`,
      rating: 4.6,
      price: "$80-120",
      image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=500&h=300&fit=crop",
      contact: "+1 (555) 234-5678",
      openHours: "5:00 PM - 10:00 PM"
    }
  ];

  const attractions = [
    {
      title: `${tripData.destination} Historic Center`,
      description: `Explore the rich history and cultural heritage of ${tripData.destination} through guided tours and exhibitions.`,
      location: `City Center, ${tripData.destination}`,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1571766963077-c90be7ccd790?w=500&h=300&fit=crop",
      openHours: "Daily, 9:00 AM - 6:00 PM",
      website: "https://attractions-example.com"
    },
    {
      title: `${tripData.destination} Landmark`,
      description: `Iconic landmark and must-visit attraction that represents the spirit and beauty of ${tripData.destination}.`,
      location: `Main District, ${tripData.destination}`,
      rating: 4.7,
      price: "Entry $25",
      image: "https://images.unsplash.com/photo-1566577134316-6ba52d5b443f?w=500&h=300&fit=crop",
      contact: "+1 (555) 345-6789",
      openHours: "Tours: 9:00 AM - 5:00 PM"
    }
  ];

  return (
    <div className="min-h-screen travel-gradient-bg">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <Link to="/dashboard" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">
                Your Trip to{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {tripData.destination}
                </span>
              </h1>
              <p className="text-muted-foreground mt-2 flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  From {tripData.startLocation}
                </span>
                <span className="flex items-center gap-1">
                  {getTravelModeIcon(tripData.travelMode)}
                  {getTravelModeLabel(tripData.travelMode)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(tripData.departureDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {tripData.travelers} {tripData.travelers === '1' ? 'Traveler' : 'Travelers'}
                </span>
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current text-yellow-500' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className="travel-button" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Trip Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up">
            <Card className="travel-card">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <CardTitle className="text-lg">Distance & Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{mockTravelInfo.distance}</div>
                <div className="flex items-center text-muted-foreground mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {mockTravelInfo.time}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Via {getTravelModeLabel(tripData.travelMode)}
                </div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Thermometer className="h-5 w-5 text-accent mr-2" />
                <CardTitle className="text-lg">Weather</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{weather.temperature}</div>
                <div className="text-muted-foreground">
                  {weather.condition} • {weather.humidity} humidity
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Expected conditions
                </div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Badge className="bg-success/10 text-success">Ready to Go</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">Trip Status</div>
                <div className="text-muted-foreground">
                  All details confirmed and ready for your journey
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Plan created: {new Date(tripData.timestamp).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hotels, Restaurants, Attractions Sections (unchanged) */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recommended Hotels in {tripData.destination}</h2>
              <Badge variant="secondary">{hotels.length} options</Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel, index) => (
                <TravelCard
                  key={index}
                  type="hotel"
                  title={hotel.title}
                  description={hotel.description}
                  location={hotel.location}
                  rating={hotel.rating}
                  price={hotel.price}
                  image={hotel.image}
                  contact={hotel.contact}
                  website={hotel.website}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Restaurants in {tripData.destination}</h2>
              <Badge variant="secondary">{restaurants.length} options</Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant, index) => (
                <TravelCard
                  key={index}
                  type="restaurant"
                  title={restaurant.title}
                  description={restaurant.description}
                  location={restaurant.location}
                  rating={restaurant.rating}
                  price={restaurant.price}
                  image={restaurant.image}
                  contact={restaurant.contact}
                  openHours={restaurant.openHours}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Must-Visit Attractions in {tripData.destination}</h2>
              <Badge variant="secondary">{attractions.length} attractions</Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction, index) => (
                <TravelCard
                  key={index}
                  type="attraction"
                  title={attraction.title}
                  description={attraction.description}
                  location={attraction.location}
                  rating={attraction.rating}
                  price={attraction.price}
                  image={attraction.image}
                  contact={attraction.contact}
                  website={attraction.website}
                  openHours={attraction.openHours}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Results;