import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, Camera, Star, MapPin, Clock, Globe, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";

const ManageAttractions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dummy attraction data
  const attractions = [
    {
      id: 1,
      name: "Eiffel Tower",
      location: "Champ de Mars, Paris",
      city: "Paris",
      country: "France",
      category: "Landmark",
      rating: 4.6,
      entryFee: "€29.40",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
      website: "https://www.toureiffel.paris",
      openHours: "9:30 AM - 11:45 PM",
      status: "Active",
      featured: true,
      visitorsPerYear: "7M"
    },
    {
      id: 2,
      name: "Tokyo Skytree",
      location: "Sumida, Tokyo",
      city: "Tokyo",
      country: "Japan",
      category: "Observation Tower",
      rating: 4.4,
      entryFee: "¥2,100",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
      website: "https://www.tokyo-skytree.jp",
      openHours: "8:00 AM - 10:00 PM",
      status: "Active",
      featured: true,
      visitorsPerYear: "6M"
    },
    {
      id: 3,
      name: "Central Park",
      location: "Manhattan, New York",
      city: "New York",
      country: "USA",
      category: "Park",
      rating: 4.7,
      entryFee: "Free",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
      website: "https://www.centralparknyc.org",
      openHours: "6:00 AM - 1:00 AM",
      status: "Active",
      featured: true,
      visitorsPerYear: "42M"
    },
    {
      id: 4,
      name: "British Museum",
      location: "Bloomsbury, London",
      city: "London",
      country: "UK",
      category: "Museum",
      rating: 4.5,
      entryFee: "Free",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
      website: "https://www.britishmuseum.org",
      openHours: "10:00 AM - 5:00 PM",
      status: "Pending",
      featured: false,
      visitorsPerYear: "5.8M"
    },
    {
      id: 5,
      name: "Sydney Opera House",
      location: "Bennelong Point, Sydney",
      city: "Sydney",
      country: "Australia",
      category: "Performing Arts",
      rating: 4.8,
      entryFee: "Tour $43",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      website: "https://www.sydneyoperahouse.com",
      openHours: "9:00 AM - 8:30 PM",
      status: "Active",
      featured: true,
      visitorsPerYear: "8.2M"
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

  const getCategoryBadge = (category: string) => {
    const colorMap: { [key: string]: string } = {
      "Landmark": "bg-blue-500/10 text-blue-500",
      "Museum": "bg-purple-500/10 text-purple-500",
      "Park": "bg-green-500/10 text-green-500",
      "Observation Tower": "bg-cyan-500/10 text-cyan-500",
      "Performing Arts": "bg-pink-500/10 text-pink-500"
    };
    return <Badge className={colorMap[category] || "bg-primary/10 text-primary"}>{category}</Badge>;
  };

  const filteredAttractions = attractions.filter(attraction =>
    attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attraction.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attraction.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen travel-gradient-bg">
      <AdminSidebar />
      
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Attraction Management</h1>
              <p className="text-muted-foreground">
                Manage tourist attractions and points of interest
              </p>
            </div>
            <Button className="travel-button">
              <Plus className="h-4 w-4 mr-2" />
              Add Attraction
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Attractions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{attractions.length}</div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {attractions.filter(a => a.status === "Active").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Featured</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {attractions.filter(a => a.featured).length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  {(attractions.reduce((sum, a) => sum + a.rating, 0) / attractions.length).toFixed(1)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="travel-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Attractions</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search attractions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="travel-input pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Attractions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <Card key={attraction.id} className="travel-card group hover:scale-[1.02] transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(attraction.status)}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 rounded-lg px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-medium">{attraction.rating}</span>
                  </div>
                  {attraction.featured && (
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-primary/10 text-primary">Featured</Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-card-foreground line-clamp-1">
                    {attraction.name}
                  </CardTitle>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{attraction.city}, {attraction.country}</span>
                    </div>
                    {getCategoryBadge(attraction.category)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Ticket className="h-4 w-4 mr-2" />
                      <span>Entry Fee</span>
                    </div>
                    <span className="text-sm font-bold text-primary">{attraction.entryFee}</span>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Annual Visitors</div>
                    <div className="text-lg font-bold text-accent">{attraction.visitorsPerYear}</div>
                  </div>

                  <div className="flex items-start text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{attraction.openHours}</span>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 mr-2" />
                    <a 
                      href={attraction.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline line-clamp-1"
                    >
                      Visit Website
                    </a>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Camera className="h-4 w-4 mr-2" />
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

export default ManageAttractions;