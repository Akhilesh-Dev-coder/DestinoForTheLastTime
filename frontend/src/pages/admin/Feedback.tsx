// src/pages/admin/Feedback.tsx

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, CheckCircle, Trash2, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import AdminSidebar from "@/components/AdminSidebar";

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");
        if (!token) {
          window.location.href = "/admin-login";
          return;
        }

        const res = await fetch("http://localhost:5000/api/admin/get-feedback", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin-login";
          return;
        }

        const data = await res.json();
        if (data.success) {
          setFeedbackList(data.feedback || []);
        } else {
          setError(data.message || "Failed to load feedback");
        }
      } catch (err) {
        console.error(err);
        setError("Network error. Could not connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const markAsRead = (id) => {
    // Optional: Call API to update status (not implemented in your backend yet)
    // For now, just update UI
    setFeedbackList(feedbackList.map(f => 
      f.id === id ? { ...f, status: "Read" } : f
    ));
  };

  const deleteFeedback = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/admin/delete-feedback/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setFeedbackList(feedbackList.filter(f => f.id !== id));
      } else {
        alert(data.message || "Failed to delete feedback");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting feedback. Please try again.");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Read") {
      return <Badge className="bg-success/10 text-success">Read</Badge>;
    }
    return <Badge className="bg-warning/10 text-warning">New</Badge>;
  };

  const filteredFeedback = feedbackList.filter(item =>
    (item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.message?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen travel-gradient-bg flex items-center justify-center">
        <p className="text-muted-foreground">Loading feedback...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen travel-gradient-bg">
      <AdminSidebar />
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Feedback</h1>
              <p className="text-muted-foreground">
                Review and manage feedback from your users
              </p>
            </div>
          </div>

          <Card className="travel-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Feedback Inbox</CardTitle>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search feedback..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500 mb-4">{error}</p>}

              {filteredFeedback.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No feedback received yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFeedback.map((item) => (
                        <TableRow key={item.id} className="border-border">
                          <TableCell>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.email}</div>
                          </TableCell>
                          <TableCell className="max-w-xs break-words">
                            {item.message}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(item.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status || "New")}</TableCell>
                          <TableCell className="text-right space-x-2">
                            {item.status !== "Read" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(item.id)}
                              >
                                <CheckCircle className="h-4 w-4 text-success" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive"
                              onClick={() => deleteFeedback(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;