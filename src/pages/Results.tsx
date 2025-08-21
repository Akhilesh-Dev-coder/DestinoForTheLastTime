import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Thermometer, ArrowLeft, Download, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import TravelCard from "@/components/TravelCard";

const Results = () => {
  // Dummy data for demonstration
  const tripDetails = {
    from: "New York, NY",
    to: "Boston, MA",
    mode: "Car",
    distance: "215 km",
    estimatedTime: "3h 45min",
    weather: {
      temperature: "22°C",
      condition: "Sunny",
      humidity: "65%"
    }
  };

  const hotels = [
    {
      title: "The Ritz-Carlton Boston",
      description: "Luxury hotel in the heart of downtown Boston with exceptional service and amenities.",
      location: "10 Avery St, Boston, MA",
      rating: 4.8,
      price: "$350/night",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
      contact: "+1 (617) 574-7100",
      website: "https://ritzcarlton.com"
    },
    {
      title: "Boston Harbor Hotel",
      description: "Waterfront luxury with stunning harbor views and world-class dining.",
      location: "70 Rowes Wharf, Boston, MA",
      rating: 4.7,
      price: "$280/night",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
      contact: "+1 (617) 439-7000",
      website: "https://bhh.com"
    }
  ];

  const restaurants = [
    {
      title: "Union Oyster House",
      description: "America's oldest restaurant serving traditional New England seafood since 1826.",
      location: "41 Union St, Boston, MA",
      rating: 4.5,
      price: "$50-80",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=300&fit=crop",
      contact: "+1 (617) 227-2750",
      openHours: "11:00 AM - 9:30 PM"
    },
    {
      title: "Neptune Oyster",
      description: "Intimate North End spot famous for fresh oysters and lobster rolls.",
      location: "63 Salem St, Boston, MA",
      rating: 4.6,
      price: "$30-60",
      image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=500&h=300&fit=crop",
      contact: "+1 (617) 742-3474",
      openHours: "11:30 AM - 9:30 PM"
    }
  ];

  const attractions = [
    {
      title: "Freedom Trail",
      description: "A 2.5-mile red-brick trail leading to 16 historically significant sites.",
      location: "Boston Common, Boston, MA",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1571766963077-c90be7ccd790?w=500&h=300&fit=crop",
      openHours: "Daily, 24 hours",
      website: "https://thefreedomtrail.org"
    },
    {
      title: "Fenway Park",
      description: "Iconic baseball stadium, home of the Boston Red Sox since 1912.",
      location: "4 Yawkey Way, Boston, MA",
      rating: 4.7,
      price: "Tour $22",
      image: "https://images.unsplash.com/photo-1566577134316-6ba52d5b443f?w=500&h=300&fit=crop",
      contact: "+1 (617) 226-6666",
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
                  {tripDetails.to}
                </span>
              </h1>
              <p className="text-muted-foreground mt-2">
                From {tripDetails.from} • {tripDetails.mode} • {tripDetails.distance}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className="travel-button">
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
                <div className="text-2xl font-bold text-primary">{tripDetails.distance}</div>
                <div className="flex items-center text-muted-foreground mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {tripDetails.estimatedTime}
                </div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Thermometer className="h-5 w-5 text-accent mr-2" />
                <CardTitle className="text-lg">Weather</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{tripDetails.weather.temperature}</div>
                <div className="text-muted-foreground">
                  {tripDetails.weather.condition} • {tripDetails.weather.humidity} humidity
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
              </CardContent>
            </Card>
          </div>

          {/* Hotels Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recommended Hotels</h2>
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

          {/* Restaurants Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Restaurants</h2>
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

          {/* Attractions Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Must-Visit Attractions</h2>
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