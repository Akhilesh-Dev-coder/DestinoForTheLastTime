import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, CircleUserRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Get user from localStorage
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-primary-foreground"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0 2 2 4 4 4 1.061 0 2.061-.394 2.865-1.061l2.792 2.792zm-3.536-3.536A4 4 0 009 13c0-2.21 1.79-4 4-4 1.3 0 2.45.62 3.17 1.58l-2.17 2.17z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Destino
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/results"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/results") ? "text-primary" : "text-muted-foreground"
              )}
            >
              Results
            </Link>
            <Link
              to="/trips"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/trips") ? "text-primary" : "text-muted-foreground"
              )}
            >
              My Trips
            </Link>
          </div>

          {/* User Icon with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => userData && setIsDropdownOpen(true)}
            onMouseLeave={() => userData && setIsDropdownOpen(false)}
          >
            <CircleUserRound
              className="h-8 w-8 cursor-pointer text-primary hover:scale-105 transition-transform"
              onClick={() => {
                if (userData) {
                  setIsDropdownOpen(!isDropdownOpen);
                } else {
                  navigate("/login");
                }
              }}
            />

            {/* Dropdown Menu */}
            {userData && isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-fade-in">
                <div className="p-4 bg-gradient-to-b from-primary/10 to-transparent">
                  <p className="font-semibold text-foreground">{userData.username}</p>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
                <div className="border-t border-border">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-destructive hover:text-destructive flex items-center gap-2 px-4 py-3"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-slide-up border-t border-border/20">
            <div className="flex flex-col space-y-2">
              <Link
                to="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary px-4 py-2",
                  isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
                )}
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/results"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary px-4 py-2",
                  isActive("/results") ? "text-primary" : "text-muted-foreground"
                )}
                onClick={toggleMenu}
              >
                Results
              </Link>
              <Link
                to="/trips"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary px-4 py-2",
                  isActive("/trips") ? "text-primary" : "text-muted-foreground"
                )}
                onClick={toggleMenu}
              >
                My Trips
              </Link>

              <div className="border-t border-border/20 pt-4 mt-2">
                <div className="flex flex-col space-y-2 px-4">
                  {userData ? (
                    <>
                      <div className="text-sm">
                        <p className="font-medium">{userData.username}</p>
                        <p className="text-muted-foreground">{userData.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-destructive"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start"
                        asChild
                        onClick={toggleMenu}
                      >
                        <Link to="/login">
                          <User className="h-4 w-4 mr-2" />
                          Login
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        className="travel-button justify-start"
                        asChild
                        onClick={toggleMenu}
                      >
                        <Link to="/signup">Get Started</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;