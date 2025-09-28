// src/pages/admin/Dashboard.tsx

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Users, DollarSign, AlertTriangle } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen travel-gradient-bg">
        <AdminSidebar />
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2,847</div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">1,243</div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenue (This Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">$89,452</div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">17</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="travel-card">
              <CardHeader>
                <CardTitle>Bookings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <LineChart className="h-12 w-12 mr-2" />
                  Chart Placeholder - Bookings Trend
                </div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader>
                <CardTitle>User Roles Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <PieChart className="h-12 w-12 mr-2" />
                  Chart Placeholder - Role Breakdown
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="travel-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition">
                  <Users className="h-6 w-6 mb-2 mx-auto" />
                  Manage Users
                </button>
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition">
                  <DollarSign className="h-6 w-6 mb-2 mx-auto" />
                  View Payments
                </button>
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition">
                  <AlertTriangle className="h-6 w-6 mb-2 mx-auto" />
                  Review Support
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;