import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, MapPin, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";

const ManageDestinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dummy destination data
  const destinations = [
    {
      id: 1,
      name: "Paris, France",
      country: "France",
      description: "The City of Light, famous for its art, fashion, and cuisine.",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
      rating: 4.8,
      attractions: 45,
      hotels: 120,
      restaurants: 89,
      status: "Active",
      featured: true
    },
    {
      id: 2,
      name: "Tokyo, Japan",
      country: "Japan",
      description: "A fascinating blend of ancient traditions and cutting-edge technology.",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      rating: 4.7,
      attractions: 38,
      hotels: 95,
      restaurants: 156,
      status: "Active",
      featured: true
    },
    {
      id: 3,
      name: "New York City, USA",
      country: "United States",
      description: "The city that never sleeps, with iconic landmarks and vibrant culture.",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
      rating: 4.6,
      attractions: 52,
      hotels: 145,
      restaurants: 234,
      status: "Active",
      featured: false
    },
    {
      id: 4,
      name: "London, UK",
      country: "United Kingdom",
      description: "Historic capital with royal palaces, museums, and diverse neighborhoods.",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
      rating: 4.5,
      attractions: 41,
      hotels: 87,
      restaurants: 178,
      status: "Active",
      featured: false
    },
    {
      id: 5,
      name: "Sydney, Australia",
      country: "Australia",
      description: "Stunning harbor city with iconic Opera House and beautiful beaches.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      rating: 4.4,
      attractions: 28,
      hotels: 65,
      restaurants: 92,
      status: "Draft",
      featured: false
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-success/10 text-success">Active</Badge>;
      case "Draft":
        return <Badge className="bg-muted text-muted-foreground">Draft</Badge>;
      case "Inactive":
        return <Badge className="bg-destructive/10 text-destructive">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen travel-gradient-bg">
      <AdminSidebar />
      
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Destination Management</h1>
              <p className="text-muted-foreground">
                Manage travel destinations and their information
              </p>
            </div>
            <Button className="travel-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Destination
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{destinations.length}</div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {destinations.filter(d => d.status === "Active").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Featured</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {destinations.filter(d => d.featured).length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  {(destinations.reduce((sum, d) => sum + d.rating, 0) / destinations.length).toFixed(1)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="travel-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Destinations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="travel-input pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Destinations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <Card key={destination.id} className="travel-card group hover:scale-[1.02] transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(destination.status)}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 rounded-lg px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-medium">{destination.rating}</span>
                  </div>
                  {destination.featured && (
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-primary/10 text-primary">Featured</Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold text-card-foreground">
                      {destination.name}
                    </CardTitle>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{destination.country}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {destination.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">{destination.attractions}</div>
                      <div className="text-xs text-muted-foreground">Attractions</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-accent">{destination.hotels}</div>
                      <div className="text-xs text-muted-foreground">Hotels</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-success">{destination.restaurants}</div>
                      <div className="text-xs text-muted-foreground">Restaurants</div>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
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

export default ManageDestinations;