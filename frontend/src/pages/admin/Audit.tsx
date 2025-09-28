// src/pages/admin/Audit.tsx

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AdminSidebar from "@/components/AdminSidebar";

const Audit = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch("http://localhost:5000/api/admin/get-audit-logs", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.status === 401 || res.status === 403) {
          window.location.href = "/admin-login";
          return;
        }

        const data = await res.json();
        if (data.success) {
          setLogs(data.logs);
          setFilteredLogs(data.logs);
        } else {
          setError("Failed to load audit logs");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  useEffect(() => {
    const filtered = logs.filter(log =>
      log.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip_address?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLogs(filtered);
  }, [searchQuery, logs]);

  if (loading) {
    return (
      <div className="min-h-screen travel-gradient-bg flex items-center justify-center">
        <p className="text-muted-foreground">Loading audit logs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen travel-gradient-bg">
      <AdminSidebar />
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          </div>

          <Card className="travel-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Audit Trail</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="travel-input pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                        No audit logs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.username || "System"}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                        <TableCell className="text-muted-foreground">{log.ip_address}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Audit;