import React from "react";
import { Users, MapPin, Hotel, UtensilsCrossed, Camera, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "2,547",
      change: "+12%",
      changeType: "increase" as const,
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Active Destinations",
      value: "148",
      change: "+5%",
      changeType: "increase" as const,
      icon: MapPin,
      color: "text-green-500"
    },
    {
      title: "Partner Hotels",
      value: "89",
      change: "+8%",
      changeType: "increase" as const,
      icon: Hotel,
      color: "text-purple-500"
    },
    {
      title: "Listed Restaurants",
      value: "234",
      change: "+15%",
      changeType: "increase" as const,
      icon: UtensilsCrossed,
      color: "text-orange-500"
    }
  ];

  const recentActivity = [
    {
      action: "New user registration",
      user: "john.doe@example.com",
      time: "2 minutes ago",
      type: "user"
    },
    {
      action: "Hotel added",
      user: "Admin",
      time: "15 minutes ago",
      type: "hotel"
    },
    {
      action: "Destination updated",
      user: "sarah.admin@travel.com",
      time: "1 hour ago",
      type: "destination"
    },
    {
      action: "Restaurant verified",
      user: "mike.manager@travel.com",
      time: "2 hours ago",
      type: "restaurant"
    }
  ];

  const topDestinations = [
    { name: "Paris, France", bookings: 156, trend: "+23%" },
    { name: "Tokyo, Japan", bookings: 142, trend: "+18%" },
    { name: "New York, USA", bookings: 128, trend: "+12%" },
    { name: "London, UK", bookings: 98, trend: "+8%" },
    { name: "Rome, Italy", bookings: 87, trend: "+15%" }
  ];

  return (
    <div className="min-h-screen travel-gradient-bg">
      <AdminSidebar />
      
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your travel platform.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="travel-card hover:scale-105 transition-transform duration-300">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <span className="text-success">{stat.change} from last month</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="travel-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest actions and updates across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${
                            activity.type === 'user' ? 'bg-blue-500/10 text-blue-500' :
                            activity.type === 'hotel' ? 'bg-purple-500/10 text-purple-500' :
                            activity.type === 'destination' ? 'bg-green-500/10 text-green-500' :
                            'bg-orange-500/10 text-orange-500'
                          }`}>
                            {activity.type === 'user' ? <Users className="h-4 w-4" /> :
                             activity.type === 'hotel' ? <Hotel className="h-4 w-4" /> :
                             activity.type === 'destination' ? <MapPin className="h-4 w-4" /> :
                             <UtensilsCrossed className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.user}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Destinations */}
            <div>
              <Card className="travel-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-accent" />
                    Top Destinations
                  </CardTitle>
                  <CardDescription>
                    Most popular travel destinations this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topDestinations.map((destination, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{destination.name}</p>
                          <p className="text-xs text-muted-foreground">{destination.bookings} bookings</p>
                        </div>
                        <Badge className="bg-success/10 text-success">
                          {destination.trend}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;