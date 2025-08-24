import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  MapPin, 
  Hotel, 
  UtensilsCrossed, 
  Camera,
  LayoutDashboard,
  Menu,
  X,
  Plane,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { 
      title: "Dashboard", 
      href: "/admin/dashboard", 
      icon: LayoutDashboard 
    },
    { 
      title: "Manage Users", 
      href: "/admin/users", 
      icon: Users 
    },
    
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-sidebar-primary to-accent rounded-lg">
              <Plane className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">
              Admin Panel
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group",
                    isActive(item.href)
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5",
                    isActive(item.href) ? "text-sidebar-primary" : "text-sidebar-foreground"
                  )} />
                  {!isCollapsed && (
                    <span className="truncate">{item.title}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsed && "justify-center"
          )}
          asChild
        >
          <Link to="/login">
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;