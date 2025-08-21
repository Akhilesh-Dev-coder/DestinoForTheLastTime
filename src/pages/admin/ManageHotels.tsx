import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, Hotel, Star, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";

const ManageHotels = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dummy hotel data
  const hotels = [
    {
      id: 1,
      name: "The Ritz-Carlton Paris",
      location: "Place Vendôme, Paris",
      city: "Paris",
      country: "France",
      rating: 4.8,
      stars: 5,
      pricePerNight: "$450",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      phone: "+33 1 43 16 30 30",
      amenities: ["Spa", "Pool", "Gym", "Restaurant", "Bar"],
      status: "Active",
      verified: true,
      rooms: 142
    },
    {
      id: 2,
      name: "Park Hyatt Tokyo",
      location: "Shinjuku, Tokyo",
      city: "Tokyo",
      country: "Japan",
      rating: 4.7,
      stars: 5,
      pricePerNight: "$380",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      phone: "+81 3 5322 1234",
      amenities: ["Spa", "Pool", "Gym", "Restaurant"],
      status: "Active",
      verified: true,
      rooms: 177
    },
    {
      id: 3,
      name: "The Plaza Hotel",
      location: "Fifth Avenue, New York",
      city: "New York",
      country: "USA",
      rating: 4.6,
      stars: 5,
      pricePerNight: "$520",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      phone: "+1 212 759 3000",
      amenities: ["Spa", "Gym", "Restaurant", "Bar", "Concierge"],
      status: "Active",
      verified: true,
      rooms: 282
    },
    {
      id: 4,
      name: "Claridge's London",
      location: "Mayfair, London",
      city: "London",
      country: "UK",
      rating: 4.5,
      stars: 5,
      pricePerNight: "$420",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      phone: "+44 20 7629 8860",
      amenities: ["Spa", "Restaurant", "Bar", "Gym"],
      status: "Pending",
      verified: false,
      rooms: 203
    },
    {
      id: 5,
      name: "Four Seasons Sydney",
      location: "Sydney Harbour, Sydney",
      city: "Sydney",
      country: "Australia",
      rating: 4.4,
      stars: 5,
      pricePerNight: "$350",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
      phone: "+61 2 9250 3100",
      amenities: ["Pool", "Spa", "Restaurant", "Bar"],
      status: "Inactive",
      verified: true,
      rooms: 531
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-success/10 text-success">Active</Badge>;
      case "Pending":
        return <Badge className="bg-orange-500/10 text-orange-500">Pending</Badge>;
      case "Inactive":
        return <Badge className="bg-destructive/10 text-destructive">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen travel-gradient-bg">
      <AdminSidebar />
      
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Hotel Management</h1>
              <p className="text-muted-foreground">
                Manage partner hotels and accommodations
              </p>
            </div>
            <Button className="travel-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Hotel
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Hotels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{hotels.length}</div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Hotels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {hotels.filter(h => h.status === "Active").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {hotels.filter(h => h.verified).length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  {(hotels.reduce((sum, h) => sum + h.rating, 0) / hotels.length).toFixed(1)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="travel-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Hotels</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search hotels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="travel-input pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Hotels Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <Card key={hotel.id} className="travel-card group hover:scale-[1.02] transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(hotel.status)}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 rounded-lg px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-medium">{hotel.rating}</span>
                  </div>
                  {hotel.verified && (
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-primary/10 text-primary">Verified</Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-card-foreground line-clamp-1">
                    {hotel.name}
                  </CardTitle>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{hotel.city}, {hotel.country}</span>
                    </div>
                    <div className="flex">{renderStars(hotel.stars)}</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Price per night</span>
                    <span className="text-lg font-bold text-primary">{hotel.pricePerNight}</span>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{hotel.phone}</span>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">{hotel.rooms} rooms</p>
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {hotel.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{hotel.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Hotel className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageHotels;