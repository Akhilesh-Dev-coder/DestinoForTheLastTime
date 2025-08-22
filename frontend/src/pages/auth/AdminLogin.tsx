import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add admin login logic
    console.log("Admin login submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center travel-gradient-bg p-4">
      <div className="w-full max-w-md space-y-8 animate-slide-up">
        <div className="text-center">
          <div className="inline-flex p-3 bg-gradient-to-r from-destructive to-orange-500 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-destructive to-orange-500 bg-clip-text text-transparent">
            Admin Access
          </h1>
          <p className="text-muted-foreground mt-2">
            Administrative login for authorized personnel only
          </p>
        </div>

        <Card className="travel-card border-destructive/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-destructive">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your administrative credentials
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter admin email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="travel-input pl-10 border-destructive/20 focus:ring-destructive focus:border-destructive"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="travel-input pl-10 pr-10 border-destructive/20 focus:ring-destructive focus:border-destructive"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-xs text-destructive-foreground">
                  <Shield className="inline h-3 w-3 mr-1" />
                  This is a secure administrative area. Unauthorized access attempts are monitored and logged.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-destructive to-orange-500 hover:from-destructive/90 hover:to-orange-500/90 text-primary-foreground group"
              >
                Access Admin Panel
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Link to="/login" className="w-full">
                <Button variant="ghost" className="w-full text-muted-foreground">
                  ← Regular User Login
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;