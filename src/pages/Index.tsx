import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Users, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen travel-gradient-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
                <Plane className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TravelPlanner
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Plan Trip
              </Link>
              <Link to="/results" className="text-muted-foreground hover:text-primary transition-colors">
                Discover
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button className="travel-button" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-slide-up">
              Plan Your Dream{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-float">
                Adventure
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in">
              Discover amazing destinations, find the perfect route, and explore local gems 
              with our intelligent travel planning platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Button size="lg" className="travel-button text-lg px-8 py-4 group" asChild>
                <Link to="/dashboard">
                  Start Planning
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                <Link to="/results">
                  Explore Destinations
                </Link>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 animate-slide-up">
            <Card className="travel-card text-center group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-r from-primary to-accent rounded-full w-fit mb-4 group-hover:shadow-[var(--shadow-glow)] transition-shadow duration-300">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Smart Routes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get optimized travel routes with real-time traffic and weather updates for the best journey experience.
                </p>
              </CardContent>
            </Card>

            <Card className="travel-card text-center group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-r from-success to-accent rounded-full w-fit mb-4 group-hover:shadow-[var(--shadow-glow)] transition-shadow duration-300">
                  <Calendar className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Trip Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Plan your entire trip with detailed itineraries, bookings, and personalized recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="travel-card text-center group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-r from-accent to-primary rounded-full w-fit mb-4 group-hover:shadow-[var(--shadow-glow)] transition-shadow duration-300">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Local Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Discover hidden gems, local restaurants, and attractions recommended by fellow travelers.
                </p>
              </CardContent>
            </Card>

            <Card className="travel-card text-center group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-fit mb-4 group-hover:shadow-[var(--shadow-glow)] transition-shadow duration-300">
                  <Plane className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Multi-Modal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose from flights, trains, or car rentals to find the perfect transportation for your journey.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <Card className="travel-card max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Ready to Explore?</CardTitle>
                <CardDescription className="text-lg">
                  Join thousands of travelers who trust TravelPlanner for their adventures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" className="travel-button text-lg px-8 py-4 group" asChild>
                  <Link to="/signup">
                    Create Free Account
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
