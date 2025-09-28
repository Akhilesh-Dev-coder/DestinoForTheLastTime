// src/pages/admin/Content.tsx

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

const AdminContent = () => {
  const [content, setContent] = useState({
    destinations: [
      { id: 1, name: "Paris, France", category: "City", status: "Published" },
      { id: 2, name: "Bali, Indonesia", category: "Beach", status: "Draft" },
      { id: 3, name: "Machu Picchu, Peru", category: "Adventure", status: "Published" },
    ],
    packages: [
      { id: 1, name: "Romantic Paris Getaway", price: "$1,299", status: "Published" },
      { id: 2, name: "Bali Surf & Yoga Retreat", price: "$999", status: "Draft" },
    ],
    itineraries: [
      { id: 1, name: "7-Day European Tour", days: 7, status: "Published" },
      { id: 2, name: "Weekend in New York", days: 3, status: "Draft" },
    ]
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Published":
        return <div className="bg-success/10 text-success">Published</div>;
      case "Draft":
        return <div className="bg-muted text-muted-foreground">Draft</div>;
      default:
        return <div>{status}</div>;
    }
  };

  return (
    <div className="min-h-screen travel-gradient-bg">
      <AdminSidebar />
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
          </div>

          <Tabs defaultValue="destinations" className="travel-card">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="destinations">Destinations</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="itineraries">Itineraries</TabsTrigger>
            </TabsList>

            <TabsContent value="destinations">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Destinations</CardTitle>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Destination
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.destinations.map(dest => (
                      <div key={dest.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">{dest.name}</div>
                          <div className="text-sm text-muted-foreground">{dest.category}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(dest.status)}
                          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="packages">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Packages</CardTitle>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Package
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.packages.map(pkg => (
                      <div key={pkg.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">{pkg.name}</div>
                          <div className="text-sm text-muted-foreground">{pkg.price}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(pkg.status)}
                          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="itineraries">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Itineraries</CardTitle>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Itinerary
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.itineraries.map(itin => (
                      <div key={itin.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">{itin.name}</div>
                          <div className="text-sm text-muted-foreground">{itin.days} days</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(itin.status)}
                          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;