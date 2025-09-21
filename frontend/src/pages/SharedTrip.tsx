// src/pages/SharedTrip.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrip } from "@/context/TripContext";
import {
  MapPin,
  Clock,
  Thermometer,
  ArrowLeft,
  Share2,
  Calendar,
  Users,
  Car,
  Train,
  Plane,
  AlertCircle,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import TravelCard from "@/components/TravelCard";
import { Link } from "react-router-dom";

// Reuse helpers from Results.tsx
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const formatDuration = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getTravelModeIcon = (mode: string) => {
  switch (mode?.toLowerCase()) {
    case "car":
      return <Car className="h-4 w-4" />;
    case "train":
      return <Train className="h-4 w-4" />;
    case "flight":
      return <Plane className="h-4 w-4" />;
    default:
      return <Car className="h-4 w-4" />;
  }
};

const getTravelModeLabel = (mode: string) => {
  return mode?.charAt(0).toUpperCase() + mode?.slice(1);
};

interface TripData {
  startLocation: string;
  destination: string;
  travelMode: string;
  departureDate: string;
  travelers: string;
  timestamp: string;
}

const SharedTrip = () => {
  const { id } = useParams<{ id: string }>();
  const { getTripById } = useTrip();
  const navigate = useNavigate();

  const [tripData, setTripData] = useState<TripData | null>(null);
  const [weather, setWeather] = useState<{ temperature: string; condition: string; humidity: string } | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrip = () => {
      if (!id) {
        setError("No trip ID provided.");
        return;
      }

      const trip = getTripById(id);
      if (!trip) {
        setError("Trip not found. The link may be invalid or expired.");
        return;
      }

      setTripData(trip);
    };

    loadTrip();
  }, [id, getTripById]);

  useEffect(() => {
    if (!tripData) return;

    const fetchGeoAndWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const geoPromises = [tripData.startLocation, tripData.destination].map((location) =>
          fetch(
            `https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(
              location
            )}&apikey=5ae2e3f221c38a28845f05b6fd324eada2f24f8638f6f07991f778b5`
          )
            .then((res) => res.json())
            .catch(() => null)
        );

        const [startGeo, destGeo] = await Promise.all(geoPromises);

        if (!startGeo || !destGeo || startGeo.status === "error" || destGeo.status === "error") {
          throw new Error("Could not find one or more locations.");
        }

        const startLat = startGeo.lat;
        const startLon = startGeo.lon;
        const destLat = destGeo.lat;
        const destLon = destGeo.lon;

        const km = calculateDistance(startLat, startLon, destLat, destLon);
        setDistance(`${km.toFixed(1)} km`);

        let hours = 0;
        switch (tripData.travelMode?.toLowerCase()) {
          case "car":
            hours = km / 90;
            break;
          case "train":
            hours = km / 110;
            break;
          case "flight":
            hours = km / 800 + 1.5;
            break;
          default:
            hours = km / 60;
        }
        setDuration(formatDuration(hours));

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${destLat}&longitude=${destLon}&current_weather=true&forecast_days=1&timezone=auto`
        );

        if (!weatherRes.ok) throw new Error("Weather service unavailable");

        const weatherData = await weatherRes.json();
        const temp = Math.round(weatherData.current_weather.temperature);
        const conditionCode = weatherData.current_weather.weathercode;

        const conditions: Record<number, string> = {
          0: "Clear",
          1: "Mainly Clear",
          2: "Partly Cloudy",
          3: "Overcast",
          45: "Fog",
          48: "Depositing Rime Fog",
          51: "Light Drizzle",
          53: "Moderate Drizzle",
          55: "Dense Drizzle",
          61: "Slight Rain",
          63: "Moderate Rain",
          65: "Heavy Rain",
          71: "Slight Snow",
          73: "Moderate Snow",
          75: "Heavy Snow",
          95: "Thunderstorm",
          96: "Thunderstorm with Hail",
          99: "Thunderstorm with Heavy Hail",
        };

        const condition = conditions[conditionCode] || "Unknown";

        setWeather({
          temperature: `${temp}°C`,
          condition,
          humidity: "—",
        });
      } catch (err: any) {
        console.error("Failed to fetch data:", err);
        setError(err.message || "Unable to load real-time data.");
        setWeather({ temperature: "N/A", condition: "Unavailable", humidity: "—" });
        setDistance("—");
        setDuration("—");
      } finally {
        setLoading(false);
      }
    };

    fetchGeoAndWeather();
  }, [tripData]);

  // Dummy data (same as Results.tsx)
  const hotels = tripData
    ? [
        {
          title: `Premium Hotel in ${tripData.destination}`,
          description: `Luxury accommodation in the heart of ${tripData.destination}.`,
          location: `Downtown ${tripData.destination}`,
          rating: 4.8,
          price: "$350/night",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
          contact: "+1 (555) 123-4567",
          website: "https://hotel-example.com",
        },
        {
          title: `Boutique Stay ${tripData.destination}`,
          description: `Charming boutique hotel with personalized service in ${tripData.destination}.`,
          location: `Central ${tripData.destination}`,
          rating: 4.7,
          price: "$280/night",
          image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
          contact: "+1 (555) 987-6543",
          website: "https://boutique-example.com",
        },
      ]
    : [];

  const restaurants = tripData
    ? [
        {
          title: `Local Favorite in ${tripData.destination}`,
          description: `Authentic local cuisine in ${tripData.destination}.`,
          location: `Historic District, ${tripData.destination}`,
          rating: 4.5,
          price: "$50-80",
          image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=300&fit=crop",
          contact: "+1 (555) 456-7890",
          openHours: "11:00 AM - 9:30 PM",
        },
        {
          title: `Fine Dining ${tripData.destination}`,
          description: `Upscale dining with local ingredients from ${tripData.destination}.`,
          location: `Uptown ${tripData.destination}`,
          rating: 4.6,
          price: "$80-120",
          image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=500&h=300&fit=crop",
          contact: "+1 (555) 234-5678",
          openHours: "5:00 PM - 10:00 PM",
        },
      ]
    : [];

  const attractions = tripData
    ? [
        {
          title: `${tripData.destination} Historic Center`,
          description: `Explore the rich history of ${tripData.destination}.`,
          location: `City Center, ${tripData.destination}`,
          rating: 4.4,
          image: "https://images.unsplash.com/photo-1571766963077-c90be7ccd790?w=500&h=300&fit=crop",
          openHours: "Daily, 9:00 AM - 6:00 PM",
          website: "https://attractions-example.com",
        },
        {
          title: `${tripData.destination} Landmark`,
          description: `Iconic landmark representing ${tripData.destination}.`,
          location: `Main District, ${tripData.destination}`,
          rating: 4.7,
          price: "Entry $25",
          image: "https://images.unsplash.com/photo-1566577134316-6ba52d5b443f?w=500&h=300&fit=crop",
          contact: "+1 (555) 345-6789",
          openHours: "Tours: 9:00 AM - 5:00 PM",
        },
      ]
    : [];

  if (!tripData && !loading) {
    return (
      <div className="min-h-screen travel-gradient-bg">
        <Navbar />
        <div className="pt-20 pb-12 container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Trip Not Found</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Link to="/dashboard">
            <Button className="travel-button">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen travel-gradient-bg">
      <Navbar />

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">
                Shared Trip to{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {tripData?.destination}
                </span>
              </h1>
              <p className="text-muted-foreground mt-2 flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  From {tripData?.startLocation}
                </span>
                <span className="flex items-center gap-1">
                  {tripData && getTravelModeIcon(tripData.travelMode)}
                  {tripData && getTravelModeLabel(tripData.travelMode)}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {tripData && formatDate(tripData.departureDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {tripData?.travelers} {tripData?.travelers === '1' ? 'Traveler' : 'Travelers'}
                </span>
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert("✅ Link copied!"))}>
              <Share2 className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Trip Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up">
            <Card className="travel-card">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <CardTitle className="text-lg">Distance & Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{loading ? "—" : distance}</div>
                <div className="flex items-center text-muted-foreground mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {loading ? "Loading..." : duration}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Via {tripData && getTravelModeLabel(tripData.travelMode)}
                </div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Thermometer className="h-5 w-5 text-accent mr-2" />
                <CardTitle className="text-lg">Weather</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{loading ? "—" : weather?.temperature}</div>
                <div className="text-muted-foreground">{loading ? "Loading..." : weather?.condition}</div>
                <div className="text-sm text-muted-foreground mt-2">Real-time forecast</div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Badge className="bg-success/10 text-success">Shared Trip</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">Trip Details</div>
                <div className="text-muted-foreground">This is a shared trip plan.</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Created: {tripData && new Date(tripData.timestamp).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Google Maps Button */}
          {tripData && (
            <div className="text-center mb-12 animate-slide-up">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg flex items-center gap-3"
                onClick={() => {
                  const start = encodeURIComponent(tripData.startLocation);
                  const dest = encodeURIComponent(tripData.destination);
                  window.open(`https://www.google.com/maps/dir/${start}/${dest}`, "_blank");
                }}
              >
                <Map className="h-5 w-5" />
                View Route on Google Maps
              </Button>
            </div>
          )}

          {/* Content Sections */}
          {tripData && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedTrip;