// src/pages/admin/Support.tsx

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, CheckCircle, XCircle, Clock } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

const Support = () => {
  const [tickets, setTickets] = useState([
    { id: 1, user: "john.doe@example.com", subject: "Payment failed", status: "Open", priority: "High", created: "2024-06-15" },
    { id: 2, user: "jane.smith@example.com", subject: "Itinerary not showing", status: "In Progress", priority: "Medium", created: "2024-06-14" },
    { id: 3, user: "bob.jones@example.com", subject: "Refund request", status: "Resolved", priority: "Low", created: "2024-06-13" },
    { id: 4, user: "alice.wong@example.com", subject: "Login issue", status: "Open", priority: "High", created: "2024-06-12" },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Open":
        return <Badge className="bg-warning/10 text-warning">Open</Badge>;
      case "In Progress":
        return <Badge className="bg-info/10 text-info">In Progress</Badge>;
      case "Resolved":
        return <Badge className="bg-success/10 text-success">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-destructive/10 text-destructive">High</Badge>;
      case "Medium":
        return <Badge className="bg-warning/10 text-warning">Medium</Badge>;
      case "Low":
        return <Badge className="bg-muted text-muted-foreground">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const handleResolve = (id) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, status: "Resolved" } : ticket
    ));
  };

  return (
    <div className="min-h-screen travel-gradient-bg">
        <AdminSidebar />
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Support Tickets</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{tickets.length}</div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Open Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {tickets.filter(t => t.status === "Open").length}
                </div>
              </CardContent>
            </Card>

            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {tickets.filter(t => t.status === "Resolved").length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="travel-card">
            <CardHeader>
              <CardTitle>Ticket List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.user}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{ticket.created}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <button >
                            <MessageSquare className="h-4 w-4" />
                          </button>
                          {ticket.status !== "Resolved" && (
                            <button  onClick={() => handleResolve(ticket.id)}>
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                        </div>
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

export default Support;