// src/pages/staff/StaffDashboard.tsx

import React, { useState, useEffect } from "react";
import { 
  Search, Edit, Trash2, Filter, 
  MapPin, Hotel, UtensilsCrossed, Camera, FileText, 
  MessageCircle, Users, BarChart3, TrendingUp, Eye,
  Save, X, Check, AlertCircle, Star, Clock, CheckCircle,
  Calendar, Mail
} from "lucide-react";
import StaffSidebar from "@/components/StaffSidebar";

const StaffDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get staff info for mock queries
  const staffInfo = JSON.parse(localStorage.getItem("staff") || '{}');
  const staffName = staffInfo.name || "Staff Member";
  const staffEmail = staffInfo.email || "staff@destino.com";

  // ✅ MOCK DATA — No "Add" feature, delete works
  const [travelInfo, setTravelInfo] = useState([
    { id: 1, title: "Kerala Backwaters", description: "Serene houseboat experience through palm-fringed canals", category: "Nature", status: "Published", views: 2450 },
    { id: 2, title: "Munnar Tea Gardens", description: "Rolling hills covered with lush green tea plantations", category: "Nature", status: "Published", views: 1890 },
    { id: 3, title: "Fort Kochi Heritage Walk", description: "Colonial architecture, Chinese fishing nets, and spice markets", category: "Culture", status: "Draft", views: 0 }
  ]);

  const [hotels, setHotels] = useState([
    { id: 1, name: "Taj Malabar Resort", location: "Kochi", rating: 4.8, price: "₹12,500", status: "Active", rooms: 85 },
    { id: 2, name: "Spice Garden Resort", location: "Munnar", rating: 4.5, price: "₹6,200", status: "Active", rooms: 60 }
  ]);

  const [restaurants, setRestaurants] = useState([
    { id: 1, name: "Fort House Restaurant", cuisine: "Kerala", location: "Kochi", type: "Fine Dining", rating: 4.7, status: "Active" },
    { id: 2, name: "Tea Valley Café", cuisine: "Continental", location: "Munnar", type: "Café", rating: 4.3, status: "Active" }
  ]);

  const [attractions, setAttractions] = useState([
    { id: 1, name: "Chinese Fishing Nets", type: "Historical", location: "Kochi", rating: 4.5, visitors: 45000, status: "Active" },
    { id: 2, name: "Eravikulam National Park", type: "Wildlife", location: "Munnar", rating: 4.8, visitors: 32000, status: "Active" }
  ]);

  // ✅ Mock queries from logged-in staff
  const [queries, setQueries] = useState([
    { id: 1, user: staffName, email: staffEmail, subject: "Need to update hotel pricing", status: "Pending", created_at: "2025-06-14T10:30:00Z", priority: "Medium" },
    { id: 2, user: "Priya Sharma", email: "priya.s@example.com", subject: "Booking confirmation not received", status: "In Progress", created_at: "2025-06-13T14:22:00Z", priority: "High" },
    { id: 3, user: "David Chen", email: "david.c@example.com", subject: "Request for wheelchair-accessible tours", status: "Resolved", created_at: "2025-06-10T09:15:00Z", priority: "High" }
  ]);

  const stats = {
    totalContent: travelInfo.length + hotels.length + restaurants.length + attractions.length,
    publishedContent: travelInfo.filter(item => item.status === "Published").length,
    pendingQueries: queries.filter(q => q.status === "Pending").length,
    activeHotels: hotels.filter(h => h.status === "Active").length,
    totalViews: travelInfo.reduce((sum, item) => sum + (item.views || 0), 0),
    totalVisitors: attractions.reduce((sum, item) => sum + (item.visitors || 0), 0)
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // ✅ DELETE (no add)
  const handleDelete = (id, type, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;

    switch (type) {
      case 'travel': setTravelInfo(prev => prev.filter(t => t.id !== id)); break;
      case 'hotel': setHotels(prev => prev.filter(h => h.id !== id)); break;
      case 'restaurant': setRestaurants(prev => prev.filter(r => r.id !== id)); break;
      case 'attraction': setAttractions(prev => prev.filter(a => a.id !== id)); break;
      case 'query': setQueries(prev => prev.filter(q => q.id !== id)); break;
    }
    alert(`🗑️ "${name}" has been deleted.`);
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingItem) return;
    const { type, id, ...item } = editingItem;

    switch (type) {
      case 'travel': setTravelInfo(prev => prev.map(t => t.id === id ? item : t)); break;
      case 'hotel': setHotels(prev => prev.map(h => h.id === id ? item : h)); break;
      case 'restaurant': setRestaurants(prev => prev.map(r => r.id === id ? item : r)); break;
      case 'attraction': setAttractions(prev => prev.map(a => a.id === id ? item : a)); break;
      case 'query': setQueries(prev => prev.map(q => q.id === id ? item : q)); break;
    }

    setIsEditing(false);
    setEditingItem(null);
    alert("✅ Changes saved successfully!");
  };

  const handleQueryStatusChange = (id, newStatus) => {
    setQueries(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Active': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Published': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Draft': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Inactive': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
      'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Resolved': 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>
        {status}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      'High': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[priority]}`}>
        {priority}
      </span>
    );
  };

  // ✅ Render functions (same as before, but no "Add" button)

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Staff Dashboard</h1>
          <p className="text-slate-300">Welcome back! Here's what's happening with your travel content today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Last updated</p>
          <p className="text-white font-medium">{new Date().toLocaleString()}</p>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <p className="text-sm font-medium text-slate-300">Total Content</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.totalContent}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <p className="text-sm font-medium text-slate-300">Published Items</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.publishedContent}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <p className="text-sm font-medium text-slate-300">Pending Queries</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.pendingQueries}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <p className="text-sm font-medium text-slate-300">Total Views</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.totalViews.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );

  const renderContentTable = (data, type, headers) => (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{type} Management</h3>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              placeholder={`Search ${type.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                {headers.map((header, headerIndex) => (
                  <td key={headerIndex} className="px-6 py-4 whitespace-nowrap">
                    {header === 'Status' ? (
                      getStatusBadge(item.status)
                    ) : header === 'Rating' ? (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-slate-300">{item.rating}</span>
                      </div>
                    ) : header === 'Views' ? (
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-300">{(item.views || 0).toLocaleString()}</span>
                      </div>
                    ) : header === 'Visitors' ? (
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-300">{(item.visitors || 0).toLocaleString()}</span>
                      </div>
                    ) : (
                      <span className="text-slate-300">
                        {item[header.toLowerCase().replace(' ', '')] || item[header.toLowerCase()] || item.title || item.name || '-'}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(item, type.toLowerCase().replace(' ', ''))}
                      className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-500/10 transition-all duration-200"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, type.toLowerCase().replace(' ', ''), item.title || item.name)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-all duration-200"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderQueries = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">User Queries</h2>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2">
          <span className="text-sm text-slate-300">Total: </span>
          <span className="text-white font-bold">{queries.length}</span>
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">All Queries</h3>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                placeholder="Search queries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {queries.map((query) => (
                <tr key={query.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{query.user?.split(' ').map(n => n[0]).join('') || 'U'}</span>
                      </div>
                      <div>
                        <div className="text-slate-300 font-medium">{query.user}</div>
                        <div className="text-slate-500 text-sm flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{query.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{query.subject}</td>
                  <td className="px-6 py-4">{getPriorityBadge(query.priority)}</td>
                  <td className="px-6 py-4 text-slate-300 flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>{new Date(query.created_at).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(query.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQueryStatusChange(query.id, 
                          query.status === 'Pending' ? 'In Progress' : 
                          query.status === 'In Progress' ? 'Resolved' : 'Pending'
                        )}
                        className="text-green-400 hover:text-green-300 p-2 rounded-lg hover:bg-green-500/10 transition-all duration-200"
                        title="Update Status"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(query.id, 'query', query.subject)}
                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-all duration-200"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEditModal = () => {
    if (!isEditing || !editingItem) return null;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900/95 backdrop-blur-lg border border-slate-700 rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Edit className="h-5 w-5 mr-2 text-blue-400" />
              Edit {editingItem.type}
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            {Object.entries(editingItem).map(([key, value]) => {
              if (key === 'id' || key === 'type') return null;
              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  {key === 'description' ? (
                    <textarea
                      value={value || ''}
                      onChange={(e) => setEditingItem({...editingItem, [key]: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  ) : key === 'status' ? (
                    <select
                      value={value || 'Draft'}
                      onChange={(e) => setEditingItem({...editingItem, [key]: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  ) : (
                    <input
                      type={key.includes('email') ? 'email' : key.includes('price') || key.includes('rating') || key.includes('views') || key.includes('visitors') || key.includes('rooms') ? 'number' : 'text'}
                      value={value || ''}
                      onChange={(e) => setEditingItem({...editingItem, [key]: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-end space-x-2 mt-6 pt-4 border-t border-slate-700">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg flex items-center space-x-2 transition-all"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mb-3"></div>
            <p className="text-slate-300">Loading staff panel...</p>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard': return renderDashboard();
      case 'travel-info': return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Travel Information</h2>
          {renderContentTable(travelInfo, 'Travel Info', ['Title', 'Description', 'Category', 'Status', 'Views'])}
        </div>
      );
      case 'hotels': return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Hotels</h2>
          {renderContentTable(hotels, 'Hotel', ['Name', 'Location', 'Rating', 'Price', 'Rooms', 'Status'])}
        </div>
      );
      case 'restaurants': return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Restaurants</h2>
          {renderContentTable(restaurants, 'Restaurant', ['Name', 'Cuisine', 'Location', 'Type', 'Rating', 'Status'])}
        </div>
      );
      case 'attractions': return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Attractions</h2>
          {renderContentTable(attractions, 'Attraction', ['Name', 'Type', 'Location', 'Rating', 'Visitors', 'Status'])}
        </div>
      );
      case 'queries': return renderQueries();
      case 'content': return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Content Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">Travel Info</h3>
              <p className="text-2xl font-bold text-blue-400">{travelInfo.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <Hotel className="h-8 w-8 text-teal-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">Hotels</h3>
              <p className="text-2xl font-bold text-teal-400">{hotels.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <UtensilsCrossed className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">Restaurants</h3>
              <p className="text-2xl font-bold text-green-400">{restaurants.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <Camera className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white">Attractions</h3>
              <p className="text-2xl font-bold text-yellow-400">{attractions.length}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <StaffSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="ml-16 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
      {renderEditModal()}
    </div>
  );
};

export default StaffDashboard;