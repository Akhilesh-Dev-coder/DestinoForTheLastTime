import React, { useState } from "react";
import { Search, Plus, Edit, Trash2, Filter, MoreHorizontal, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AdminSidebar from "@/components/AdminSidebar";

const ManageUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dummy user data
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "User",
      status: "Active",
      joinDate: "2024-01-15",
      lastLogin: "2024-08-20"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Premium",
      status: "Active",
      joinDate: "2024-02-10",
      lastLogin: "2024-08-19"
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@example.com",
      role: "User",
      status: "Inactive",
      joinDate: "2024-03-05",
      lastLogin: "2024-08-10"
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily.chen@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-12-01",
      lastLogin: "2024-08-21"
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@example.com",
      role: "User",
      status: "Suspended",
      joinDate: "2024-01-20",
      lastLogin: "2024-07-15"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-success/10 text-success">Active</Badge>;
      case "Inactive":
        return <Badge className="bg-muted text-muted-foreground">Inactive</Badge>;
      case "Suspended":
        return <Badge className="bg-destructive/10 text-destructive">Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-destructive/10 text-destructive">Admin</Badge>;
      case "Premium":
        return <Badge className="bg-primary/10 text-primary">Premium</Badge>;
      case "User":
        return <Badge variant="secondary">User</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen travel-gradient-bg">
      <AdminSidebar />
      
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Management</h1>
              <p className="text-muted-foreground">
                Manage user accounts, roles, and permissions
              </p>
            </div>
            <Button className="travel-button">
              <Plus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up">
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{users.length}</div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {users.filter(u => u.status === "Active").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Premium Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {users.filter(u => u.role === "Premium").length}
                </div>
              </CardContent>
            </Card>
            
            <Card className="travel-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  {users.filter(u => u.role === "Admin").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card className="travel-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>
                    A list of all users in your system
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="travel-input pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">User</TableHead>
                      <TableHead className="text-muted-foreground">Role</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Join Date</TableHead>
                      <TableHead className="text-muted-foreground">Last Login</TableHead>
                      <TableHead className="text-muted-foreground w-12">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-border hover:bg-muted/20">
                        <TableCell>
                          <div>
                            <div className="font-medium text-foreground">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                        <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-popover border border-border">
                              <DropdownMenuItem className="hover:bg-muted">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem className="hover:bg-muted">
                                {user.status === "Active" ? (
                                  <>
                                    <UserX className="h-4 w-4 mr-2" />
                                    Suspend User
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    Activate User
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="hover:bg-muted text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;