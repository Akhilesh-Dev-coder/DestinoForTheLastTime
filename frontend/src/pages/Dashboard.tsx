import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Car, Train, Plane, Search, Calendar, Users, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startLocation: "",
    destination: "",
    travelMode: "",
    departureDate: "",
    travelers: "1"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Process travel plan data
    console.log("Travel plan submitted:", formData);
    navigate("/results");
  };

  const travelModes = [
    { value: "car", label: "Car", icon: Car },
    { value: "train", label: "Train", icon: Train },
    { value: "flight", label: "Flight", icon: Plane }
  ];

  return (
    <div className="min-h-screen travel-gradient-bg">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Plan Your Perfect{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover amazing destinations, find the best routes, and explore local attractions, 
              restaurants, and hotels tailored to your travel preferences.
            </p>
          </div>

          {/* Travel Planning Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="travel-card animate-slide-up">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Navigation className="h-6 w-6 text-primary" />
                  Create Your Travel Plan
                </CardTitle>
                <CardDescription>
                  Enter your travel details to get personalized recommendations
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Location Inputs */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startLocation" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Starting Location
                      </Label>
                      <Input
                        id="startLocation"
                        name="startLocation"
                        type="text"
                        placeholder="Where are you starting from?"
                        value={formData.startLocation}
                        onChange={handleInputChange}
                        className="travel-input"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent" />
                        Destination
                      </Label>
                      <Input
                        id="destination"
                        name="destination"
                        type="text"
                        placeholder="Where do you want to go?"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="travel-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Travel Mode Selection */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-primary" />
                      Travel Mode
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("travelMode", value)}>
                      <SelectTrigger className="travel-input">
                        <SelectValue placeholder="Select your preferred travel mode" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border">
                        {travelModes.map((mode) => {
                          const Icon = mode.icon;
                          return (
                            <SelectItem key={mode.value} value={mode.value} className="hover:bg-muted">
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {mode.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Additional Options */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departureDate" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        Departure Date
                      </Label>
                      <Input
                        id="departureDate"
                        name="departureDate"
                        type="date"
                        value={formData.departureDate}
                        onChange={handleInputChange}
                        className="travel-input"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="travelers" className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        Number of Travelers
                      </Label>
                      <Select onValueChange={(value) => handleSelectChange("travelers", value)}>
                        <SelectTrigger className="travel-input">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border">
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()} className="hover:bg-muted">
                              {i + 1} {i === 0 ? "Person" : "People"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <Button 
                      type="submit" 
                      className="travel-button px-8 py-3 text-lg group"
                    >
                      <Search className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                      Create My Travel Plan
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Card>

            {/* Quick Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 animate-slide-up">
              <Card className="travel-card text-center hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto p-3 bg-gradient-to-r from-primary to-accent rounded-full w-fit mb-4">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">Smart Route Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get optimized routes with real-time traffic and weather updates
                  </p>
                </CardContent>
              </Card>

              <Card className="travel-card text-center hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto p-3 bg-gradient-to-r from-success to-accent rounded-full w-fit mb-4">
                    <Search className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">Local Discoveries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Find the best hotels, restaurants, and attractions at your destination
                  </p>
                </CardContent>
              </Card>

              <Card className="travel-card text-center hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto p-3 bg-gradient-to-r from-accent to-primary rounded-full w-fit mb-4">
                    <Calendar className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">Trip Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Save, organize, and share your travel plans with ease
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;