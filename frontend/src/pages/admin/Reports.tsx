// src/pages/admin/Reports.tsx

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, TrendingUp, Users } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

const Reports = () => {
  const reports = [
    { id: 1, name: "Monthly Revenue Report", type: "Financial", date: "2024-06-01", status: "Generated" },
    { id: 2, name: "User Engagement Metrics", type: "Analytics", date: "2024-06-05", status: "Pending" },
    { id: 3, name: "Booking Conversion Rates", type: "Performance", date: "2024-06-10", status: "Generated" },
    { id: 4, name: "Customer Satisfaction Survey", type: "Feedback", date: "2024-06-15", status: "Draft" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Generated":
        return <Badge className="bg-success/10 text-success">Generated</Badge>;
      case "Pending":
        return <Badge className="bg-warning/10 text-warning">Pending</Badge>;
      case "Draft":
        return <Badge className="bg-muted text-muted-foreground">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen travel-gradient-bg">
        <AdminSidebar />
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">12</div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Generated This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">8</div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">4</div>
              </CardContent>
            </Card>
          </div>

          <Card className="travel-card">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <button className="sm">View</button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          
        </div>
      </div>
    </div>
  );
};

export default Reports;