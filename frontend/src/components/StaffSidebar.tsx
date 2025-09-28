// src/components/StaffSidebar.tsx

import { useState } from "react";
import {
  MapPin,
  Hotel,
  UtensilsCrossed,
  Camera,
  LayoutDashboard,
  Menu,
  X,
  Plane,
  LogOut,
  FileText,
  MessageCircle,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StaffSidebar = ({ activeSection, onSectionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    {
      title: "Dashboard",
      href: "dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      title: "Travel Information",
      href: "travel-info",
      icon: MapPin,
      badge: null
    },
    {
      title: "Hotels",
      href: "hotels",
      icon: Hotel,
      badge: "12"
    },
    {
      title: "Restaurants",
      href: "restaurants", 
      icon: UtensilsCrossed,
      badge: "8"
    },
    {
      title: "Attractions",
      href: "attractions",
      icon: Camera,
      badge: null
    },
    {
      title: "Content Management",
      href: "content",
      icon: FileText,
      badge: null
    },
    {
      title: "User Queries",
      href: "queries",
      icon: MessageCircle,
      badge: "3"
    },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("staffToken");
      localStorage.removeItem("staff");
      navigate("/login"); // ✅ Redirect to main user login
    }
  };

  return (
    <div className={`fixed left-0 top-0 h-screen bg-slate-900/95 backdrop-blur-lg border-r border-slate-700/50 transition-all duration-300 z-40 shadow-2xl ${
      isCollapsed ? "w-16" : "w-64"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">
                Staff Panel
              </span>
              <p className="text-xs text-slate-400">Travel Management</p>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="text-slate-300 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition-all duration-200 group"
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5 group-hover:scale-110 transition-transform" />
          ) : (
            <X className="h-5 w-5 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {/* Navigation */}
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
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 font-medium border border-blue-500/30 shadow-lg"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-md"
                  }`}
                >
                  <Icon className={`h-5 w-5 transition-all duration-200 ${
                    isActive 
                      ? "text-blue-400 scale-110" 
                      : "text-slate-400 group-hover:text-white group-hover:scale-110"
                  }`} />
                  
                  {!isCollapsed && (
                    <>
                      <span className="truncate flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight className="h-4 w-4 text-blue-400" />
                      )}
                    </>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full"></div>
                  )}

                  {/* Badge for collapsed state */}
                  {isCollapsed && item.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-slate-900">
                      {item.badge}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: Logout Only */}
      <div className="p-4 border-t border-slate-700/50 absolute bottom-0 left-0 right-0 bg-slate-800/20">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center px-3 py-3 text-slate-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/30 border border-transparent rounded-lg transition-all duration-200 group ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <LogOut className="h-5 w-5 group-hover:text-red-400 transition-colors" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default StaffSidebar;