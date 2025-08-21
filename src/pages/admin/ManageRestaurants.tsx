import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, UtensilsCrossed, Star, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";

const ManageRestaurants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dummy restaurant data
  const restaurants = [
    {
      id: 1,
      name: "Le Jules Verne",
      location: "Eiffel Tower, Paris",
      city: "Paris",
      country: "France",
      cuisine: "French Fine Dining",
      rating: 4.8,
      priceRange: "$$$",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
      phone: "+33 1 45 55 61 44",
      openHours: "12:00 PM - 1:30 PM, 7:00 PM - 9:30 PM",
      status: "Active",
      verified: true,
      capacity: 95
    },
    {
      id: 2,
      name: "Sukiyabashi Jiro",
      location: "Ginza, Tokyo",
      city: "Tokyo",
      country: "Japan",
      cuisine: "Sushi",
      rating: 4.9,
      priceRange: "$$$$",
      image: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=400&h=300&fit=crop",
      phone: "+81 3 3535 3600",
      openHours: "11:30 AM - 2:00 PM, 5:00 PM - 8:30 PM",
      status: "Active",
      verified: true,
      capacity: 10
    },
    {
      id: 3,
      name: "Eleven Madison Park",
      location: "Flatiron District, New York",
      city: "New York",
      country: "USA",
      cuisine: "Contemporary American",
      rating: 4.7,
      priceRange: "$$$$",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      phone: "+1 212 889 0905",
      openHours: "5:30 PM - 10:00 PM",
      status: "Active",
      verified: true,
      capacity: 80
    },
    {
      id: 4,
      name: "Sketch",
      location: "Mayfair, London",
      city: "London",
      country: "UK",
      cuisine: "Modern European",
      rating: 4.5,
      priceRange: "$$$",
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&h=300&fit=crop",
      phone: "+44 20 7659 4500",
      openHours: "12:00 PM - 2:00 PM, 6:30 PM - 10:30 PM",
      status: "Pending",
      verified: false,
      capacity: 120
    },
    {
      id: 5,
      name: "Quay Restaurant",
      location: "Circular Quay, Sydney",
      city: "Sydney",
      country: "Australia",
      cuisine: "Modern Australian",
      rating: 4.6,
      priceRange: "$$$$",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      phone: "+61 2 9251 5600",
      openHours: "6:00 PM - 10:30 PM",
      status: "Active",
      verified: true,
      capacity: 140
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

  const getPriceRangeBadge = (priceRange: string) => {
    const colorMap: { [key: string]: string } = {
      "$": "bg-green-500/10 text-green-500",
      "$$": "bg-yellow-500/10 text-yellow-500", 
      "$$$": "bg-orange-500/10 text-orange-500",
      "$$$$": "bg-red-500/10 text-red-500"
    };
    return <Badge className={colorMap[priceRange] || "bg-primary/10 text-primary"}>{priceRange}</Badge>;
  };

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen travel-gradient-bg">
      <AdminSidebar />
      
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Restaurant Management</h1>
              <p className="text-muted-foreground">
                Manage partner restaurants and dining establishments
              </p>
            </div>
            <Button className="travel-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Restaurant
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Restaurants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{restaurants.length}</div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {restaurants.filter(r => r.status === "Active").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {restaurants.filter(r => r.verified).length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  {(restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length).toFixed(1)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="travel-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Restaurants</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search restaurants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="travel-input pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Restaurants Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="travel-card group hover:scale-[1.02] transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(restaurant.status)}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 rounded-lg px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-medium">{restaurant.rating}</span>
                  </div>
                  {restaurant.verified && (
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-primary/10 text-primary">Verified</Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-card-foreground line-clamp-1">
                    {restaurant.name}
                  </CardTitle>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{restaurant.city}, {restaurant.country}</span>
                    </div>
                    {getPriceRangeBadge(restaurant.priceRange)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{restaurant.cuisine}</div>
                    <div className="text-sm text-muted-foreground">Capacity: {restaurant.capacity} guests</div>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="line-clamp-1">{restaurant.phone}</span>
                  </div>

                  <div className="flex items-start text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{restaurant.openHours}</span>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <UtensilsCrossed className="h-4 w-4 mr-2" />
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

export default ManageRestaurants;