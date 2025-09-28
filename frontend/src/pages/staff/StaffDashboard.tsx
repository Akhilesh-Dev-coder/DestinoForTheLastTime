import React, { useState, useEffect } from "react";
import { 
  Search, Plus, Edit, Trash2, Filter, MoreHorizontal, 
  MapPin, Hotel, UtensilsCrossed, Camera, FileText, 
  MessageCircle, Users, BarChart3, TrendingUp, Eye,
  Save, X, Check, AlertCircle, Star, Clock, CheckCircle,
  XCircle, Calendar, Mail, Phone, Globe, Award
} from "lucide-react";

// Import the StaffSidebar component
const StaffSidebar = ({ activeSection, onSectionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [staffInfo, setStaffInfo] = useState(null);

  useEffect(() => {
    const staff = localStorage.getItem("staff");
    if (staff) {
      setStaffInfo(JSON.parse(staff));
    }
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { title: "Dashboard", href: "dashboard", icon: BarChart3, badge: null },
    { title: "Travel Information", href: "travel-info", icon: MapPin, badge: null },
    { title: "Hotels", href: "hotels", icon: Hotel, badge: "12" },
    { title: "Restaurants", href: "restaurants", icon: UtensilsCrossed, badge: "8" },
    { title: "Attractions", href: "attractions", icon: Camera, badge: null },
    { title: "Content Management", href: "content", icon: FileText, badge: null },
    { title: "User Queries", href: "queries", icon: MessageCircle, badge: "3" },
    
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("staffToken");
      localStorage.removeItem("staff");
      alert("Logged out successfully!");
    }
  };

  return (
    <div className={`fixed left-0 top-0 h-screen bg-slate-900/95 backdrop-blur-lg border-r border-slate-700/50 transition-all duration-300 z-40 shadow-2xl ${
      isCollapsed ? "w-16" : "w-64"
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-lg">
              <Hotel className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">Staff Panel</span>
              <p className="text-xs text-slate-400">Travel Management</p>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="text-slate-300 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition-all duration-200"
        >
          {isCollapsed ? <Plus className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </button>
      </div>

      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href;
            
            return (
              <li key={item.href}>
                <button
                  onClick={() => onSectionChange(item.href)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 font-medium border border-blue-500/30"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-blue-400" : "text-slate-400 group-hover:text-white"}`} />
                  {!isCollapsed && (
                    <>
                      <span className="truncate flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center px-3 py-3 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <XCircle className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

const StaffDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Mock data
  const [travelInfo, setTravelInfo] = useState([
    { id: 1, title: "Kerala Backwaters", description: "Experience the serene backwaters of Kerala", category: "Nature", status: "Published", views: 1250 },
    { id: 2, title: "Munnar Tea Gardens", description: "Rolling hills covered with tea plantations", category: "Nature", status: "Draft", views: 0 },
    { id: 3, title: "Fort Kochi Heritage", description: "Historical Portuguese and Dutch architecture", category: "History", status: "Published", views: 890 }
  ]);
  
  const [hotels, setHotels] = useState([
    { id: 1, name: "Grand Palace Hotel", location: "Kochi", rating: 4.5, price: "₹5,000", status: "Active", rooms: 120 },
    { id: 2, name: "Mountain View Resort", location: "Munnar", rating: 4.2, price: "₹3,500", status: "Active", rooms: 80 },
    { id: 3, name: "Backwater Resort", location: "Alleppey", rating: 4.7, price: "₹6,500", status: "Active", rooms: 45 }
  ]);
  
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: "Spice Garden", cuisine: "Kerala", location: "Kochi", rating: 4.3, status: "Active", type: "Fine Dining" },
    { id: 2, name: "Hill Station Cafe", cuisine: "Continental", location: "Munnar", rating: 4.0, status: "Active", type: "Cafe" },
    { id: 3, name: "Coastal Delights", cuisine: "Seafood", location: "Kovalam", rating: 4.6, status: "Active", type: "Restaurant" }
  ]);

  const [attractions, setAttractions] = useState([
    { id: 1, name: "Fort Kochi", type: "Historical", location: "Kochi", rating: 4.4, status: "Active", visitors: 25000 },
    { id: 2, name: "Eravikulam National Park", type: "Wildlife", location: "Munnar", rating: 4.6, status: "Active", visitors: 18000 },
    { id: 3, name: "Kovalam Beach", type: "Beach", location: "Kovalam", rating: 4.2, status: "Active", visitors: 30000 }
  ]);

  const [queries, setQueries] = useState([
    { id: 1, user: "John Doe", email: "john@example.com", subject: "Hotel booking assistance needed", status: "Pending", date: "2025-09-25", priority: "High" },
    { id: 2, user: "Jane Smith", email: "jane@example.com", subject: "Travel itinerary planning help", status: "In Progress", date: "2025-09-24", priority: "Medium" },
    { id: 3, user: "Mike Johnson", email: "mike@example.com", subject: "Restaurant recommendations", status: "Resolved", date: "2025-09-23", priority: "Low" },
    { id: 4, user: "Sarah Wilson", email: "sarah@example.com", subject: "Transportation information", status: "Pending", date: "2025-09-25", priority: "High" }
  ]);

  const stats = {
    totalContent: travelInfo.length + hotels.length + restaurants.length + attractions.length,
    publishedContent: travelInfo.filter(item => item.status === "Published").length,
    pendingQueries: queries.filter(q => q.status === "Pending").length,
    activeHotels: hotels.filter(h => h.status === "Active").length,
    totalViews: travelInfo.reduce((sum, item) => sum + item.views, 0),
    totalVisitors: attractions.reduce((sum, item) => sum + item.visitors, 0)
  };

  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingItem) return;
    
    const { type, ...item } = editingItem;
    
    switch (type) {
      case 'travel':
        setTravelInfo(prev => prev.map(t => t.id === item.id ? item : t));
        break;
      case 'hotel':
        setHotels(prev => prev.map(h => h.id === item.id ? item : h));
        break;
      case 'restaurant':
        setRestaurants(prev => prev.map(r => r.id === item.id ? item : r));
        break;
      case 'attraction':
        setAttractions(prev => prev.map(a => a.id === item.id ? item : a));
        break;
    }
    
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleDelete = (id, type, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    
    switch (type) {
      case 'travel':
        setTravelInfo(prev => prev.filter(t => t.id !== id));
        break;
      case 'hotel':
        setHotels(prev => prev.filter(h => h.id !== id));
        break;
      case 'restaurant':
        setRestaurants(prev => prev.filter(r => r.id !== id));
        break;
      case 'attraction':
        setAttractions(prev => prev.filter(a => a.id !== id));
        break;
    }
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
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">Total Content</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalContent}</p>
              <p className="text-xs text-green-400 mt-1">↗️ 12% from last month</p>
            </div>
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">Published Items</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.publishedContent}</p>
              <p className="text-xs text-green-400 mt-1">✅ Ready for users</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">Pending Queries</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.pendingQueries}</p>
              <p className="text-xs text-yellow-400 mt-1">⏳ Need attention</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">Total Views</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalViews.toLocaleString()}</p>
              <p className="text-xs text-cyan-400 mt-1">👀 This month</p>
            </div>
            <Eye className="h-8 w-8 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-400" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium">New hotel "Backwater Resort" added</p>
                <p className="text-slate-400 text-xs">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Edit className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium">Updated "Kerala Backwaters" information</p>
                <p className="text-slate-400 text-xs">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <MessageCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium">New query from Sarah Wilson</p>
                <p className="text-slate-400 text-xs">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-green-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveSection('travel-info')}
              className="p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg text-center transition-all duration-200 group"
            >
              <MapPin className="h-6 w-6 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white text-sm font-medium">Add Travel Info</p>
            </button>
            <button
              onClick={() => setActiveSection('hotels')}
              className="p-4 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg text-center transition-all duration-200 group"
            >
              <Hotel className="h-6 w-6 text-teal-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white text-sm font-medium">Add Hotel</p>
            </button>
            <button
              onClick={() => setActiveSection('restaurants')}
              className="p-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-lg text-center transition-all duration-200 group"
            >
              <UtensilsCrossed className="h-6 w-6 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white text-sm font-medium">Add Restaurant</p>
            </button>
            <button
              onClick={() => setActiveSection('queries')}
              className="p-4 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-center transition-all duration-200 group"
            >
              <MessageCircle className="h-6 w-6 text-yellow-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-white text-sm font-medium">View Queries</p>
            </button>
          </div>
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
          Top Performing Content
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {travelInfo
            .filter(item => item.status === 'Published')
            .sort((a, b) => b.views - a.views)
            .map((item, index) => (
            <div key={item.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  index === 0 ? 'bg-yellow-500/20 text-yellow-400' : 
                  index === 1 ? 'bg-slate-400/20 text-slate-400' : 
                  'bg-amber-600/20 text-amber-400'
                }`}>
                  #{index + 1}
                </span>
                <div className="flex items-center space-x-1 text-slate-400">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">{item.views}</span>
                </div>
              </div>
              <h4 className="text-white font-medium mb-1">{item.title}</h4>
              <p className="text-slate-400 text-xs">{item.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentTable = (data, type, headers) => (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">{type} Management</h3>
            <p className="text-slate-400 text-sm mt-1">Manage your {type.toLowerCase()} listings</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                placeholder={`Search ${type.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200">
              <Plus className="h-4 w-4" />
              <span>Add New</span>
            </button>
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
            {data.map((item, index) => (
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
                        <span className="text-slate-300">{item.views?.toLocaleString() || 0}</span>
                      </div>
                    ) : (
                      <span className="text-slate-300">
                        {item[header.toLowerCase().replace(' ', '')] || 
                         item[header.toLowerCase()] || 
                         item.title || item.name || item.subject || item.user || '-'}
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
                      className="text-green-400 hover:text-green-300 p-2 rounded-lg hover:bg-green-500/10 transition-all duration-200"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
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
        <div>
          <h2 className="text-2xl font-bold text-white">User Queries Management</h2>
          <p className="text-slate-300">Handle and respond to user inquiries efficiently</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2">
            <span className="text-sm text-slate-300">Total: </span>
            <span className="text-white font-bold">{queries.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">All User Queries</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  placeholder="Search queries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/10 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-500/30 transition-all">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
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
                        <span className="text-white text-sm font-medium">{query.user.split(' ').map(n => n[0]).join('')}</span>
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
                  <td className="px-6 py-4">
                    <div className="text-slate-300 font-medium">{query.subject}</div>
                  </td>
                  <td className="px-6 py-4">{getPriorityBadge(query.priority)}</td>
                  <td className="px-6 py-4 text-slate-300 flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>{query.date}</span>
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
                        className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-500/10 transition-all duration-200"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-purple-400 hover:text-purple-300 p-2 rounded-lg hover:bg-purple-500/10 transition-all duration-200"
                        title="Reply"
                      >
                        <MessageCircle className="h-4 w-4" />
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
                      value={value}
                      onChange={(e) => setEditingItem({...editingItem, [key]: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  ) : key === 'status' ? (
                    <select
                      value={value}
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
                      type={key.includes('email') ? 'email' : key.includes('price') || key.includes('rating') || key.includes('views') ? 'number' : 'text'}
                      value={value}
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
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'travel-info':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Travel Information</h2>
                <p className="text-slate-300">Manage travel guides and destination information</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2">
                  <span className="text-sm text-slate-300">Published: </span>
                  <span className="text-green-400 font-bold">{travelInfo.filter(t => t.status === 'Published').length}</span>
                </div>
              </div>
            </div>
            {renderContentTable(travelInfo, 'Travel Info', ['Title', 'Description', 'Category', 'Status', 'Views'])}
          </div>
        );
      case 'hotels':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Hotels Management</h2>
                <p className="text-slate-300">Manage hotel listings and information</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2">
                  <span className="text-sm text-slate-300">Active: </span>
                  <span className="text-green-400 font-bold">{hotels.filter(h => h.status === 'Active').length}</span>
                </div>
              </div>
            </div>
            {renderContentTable(hotels, 'Hotel', ['Name', 'Location', 'Rating', 'Price', 'Rooms', 'Status'])}
          </div>
        );
      case 'restaurants':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Restaurants Management</h2>
                <p className="text-slate-300">Manage restaurant listings and reviews</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2">
                  <span className="text-sm text-slate-300">Active: </span>
                  <span className="text-green-400 font-bold">{restaurants.filter(r => r.status === 'Active').length}</span>
                </div>
              </div>
            </div>
            {renderContentTable(restaurants, 'Restaurant', ['Name', 'Cuisine', 'Location', 'Type', 'Rating', 'Status'])}
          </div>
        );
      case 'attractions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Attractions Management</h2>
                <p className="text-slate-300">Manage tourist attractions and activities</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2">
                  <span className="text-sm text-slate-300">Visitors: </span>
                  <span className="text-cyan-400 font-bold">{stats.totalVisitors.toLocaleString()}</span>
                </div>
              </div>
            </div>
            {renderContentTable(attractions, 'Attraction', ['Name', 'Type', 'Location', 'Rating', 'Visitors', 'Status'])}
          </div>
        );
      case 'queries':
        return renderQueries();
      case 'content':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Content Management Overview</h2>
                <p className="text-slate-300">Manage all content across the platform</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all cursor-pointer group"
                   onClick={() => setActiveSection('travel-info')}>
                <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Travel Information</h3>
                <p className="text-3xl font-bold text-blue-400 mb-1">{travelInfo.length}</p>
                <p className="text-xs text-slate-400">{travelInfo.filter(t => t.status === 'Published').length} Published</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all cursor-pointer group"
                   onClick={() => setActiveSection('hotels')}>
                <Hotel className="h-12 w-12 text-teal-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Hotels</h3>
                <p className="text-3xl font-bold text-teal-400 mb-1">{hotels.length}</p>
                <p className="text-xs text-slate-400">{hotels.reduce((sum, h) => sum + (h.rooms || 0), 0)} Total Rooms</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all cursor-pointer group"
                   onClick={() => setActiveSection('restaurants')}>
                <UtensilsCrossed className="h-12 w-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Restaurants</h3>
                <p className="text-3xl font-bold text-green-400 mb-1">{restaurants.length}</p>
                <p className="text-xs text-slate-400">{restaurants.filter(r => r.status === 'Active').length} Active</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all cursor-pointer group"
                   onClick={() => setActiveSection('attractions')}>
                <Camera className="h-12 w-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Attractions</h3>
                <p className="text-3xl font-bold text-yellow-400 mb-1">{attractions.length}</p>
                <p className="text-xs text-slate-400">{stats.totalVisitors.toLocaleString()} Visitors</p>
              </div>
            </div>

            {/* Content Performance Chart */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Content Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Status Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Published</span>
                      <span className="text-green-400">{stats.publishedContent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Draft</span>
                      <span className="text-yellow-400">{travelInfo.filter(t => t.status === 'Draft').length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Active</span>
                      <span className="text-blue-400">{hotels.filter(h => h.status === 'Active').length + restaurants.filter(r => r.status === 'Active').length + attractions.filter(a => a.status === 'Active').length}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Engagement Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Total Views</span>
                      <span className="text-cyan-400">{stats.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Avg Rating</span>
                      <span className="text-yellow-400">4.3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Pending Queries</span>
                      <span className="text-red-400">{stats.pendingQueries}</span>
                    </div>
                  </div>
                </div>
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