// src/pages/TripsPage.tsx

import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, MapPin, Calendar, Users, Car, Train, Plane, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { useTrip } from "@/context/TripContext"; // Access saved trips

const TripsPage = () => {
  const { savedTrips, removeSavedTrip } = useTrip();

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Helper to get travel mode icon
  const getModeIcon = (mode: string) => {
    switch (mode?.toLowerCase()) {
      case 'car': return <Car className="h-4 w-4" />;
      case 'train': return <Train className="h-4 w-4" />;
      case 'flight': return <Plane className="h-4 w-4" />;
      default: return <Car className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen travel-gradient-bg">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold">Your Saved Trips</h1>
            <div></div> {/* Spacer */}
          </div>

          {/* No Trips State */}
          {savedTrips.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No trips saved yet</h3>
                <p className="text-muted-foreground mb-6">
                  Plan a trip from the dashboard and save it for later!
                </p>
                <Link to="/dashboard">
                  <Button className="travel-button">Plan Your First Trip</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            /* Trip List Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTrips.map((trip, index) => (
                <Card key={index} className="flex flex-col animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{trip.destination}</CardTitle>
                        <p className="text-sm text-muted-foreground">from {trip.startLocation}</p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {formatDate(trip.departureDate)}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 flex-grow">
                    <div className="flex items-center gap-2 text-sm">
                      {getModeIcon(trip.travelMode)}
                      <span>{trip.travelMode.charAt(0).toUpperCase() + trip.travelMode.slice(1)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {trip.travelers} traveler(s)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Saved {new Date(trip.timestamp).toLocaleDateString()}
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-2">
                    <Link to="/dashboard" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          // Optional: prefill Dashboard form using context or localStorage
                          localStorage.setItem('prefillTrip', JSON.stringify(trip));
                        }}
                      >
                        Re-Plan
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeSavedTrip(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripsPage;