import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Users, Plane, Mail, Phone, MapPin as LocationIcon, Send, Heart, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

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
                Destino
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
          <div id="features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 animate-slide-up">
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

          {/* About Us Section */}
          <div id="about" className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Destino</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're passionate about making travel planning effortless and inspiring. Our mission is to connect 
                wanderers with unforgettable experiences through intelligent technology and local expertise.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="travel-card text-center group hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-fit mb-4 group-hover:shadow-[var(--shadow-glow)] transition-shadow duration-300">
                    <Heart className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To democratize travel by making trip planning accessible, affordable, and enjoyable for everyone, 
                    regardless of their experience or budget.
                  </p>
                </CardContent>
              </Card>

              <Card className="travel-card text-center group hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-fit mb-4 group-hover:shadow-[var(--shadow-glow)] transition-shadow duration-300">
                    <Shield className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">Trust & Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your safety is our priority. We partner with verified providers and continuously monitor 
                    travel conditions to ensure secure and reliable recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="travel-card text-center group hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-fit mb-4 group-hover:shadow-[var(--shadow-glow)] transition-shadow duration-300">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Award-winning platform trusted by over 100,000 travelers worldwide. We're committed to 
                    delivering exceptional experiences with every journey.
                  </p>
                </CardContent>
            </Card>
            </div>

            <Card className="travel-card max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Our Story</h3>
                    <p className="text-muted-foreground mb-4">
                      Founded in 2025 by passionate students from UIT Tholicode, Destino was born 
                      from the frustration of spending countless hours planning trips across multiple platforms.
                    </p>
                    <p className="text-muted-foreground">
                      As a student-led initiative, we've combined fresh perspectives with cutting-edge technology 
                      to streamline the entire travel planning process into one intelligent platform that learns 
                      from your preferences and connects you with authentic local experiences.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">100K+</div>
                      <div className="text-sm text-muted-foreground">Happy Travelers</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-accent">195</div>
                      <div className="text-sm text-muted-foreground">Countries Covered</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">4.9★</div>
                      <div className="text-sm text-muted-foreground">User Rating</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
                      <div className="text-2xl font-bold text-purple-500">24/7</div>
                      <div className="text-sm text-muted-foreground">Support</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Us Section */}
          <div id="contact" className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Get in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Have questions about your next adventure? We're here to help you plan the perfect trip. 
                Reach out to our friendly team of travel experts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Get in Touch Card */}
              <Card className="travel-card">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Send className="h-6 w-6 text-primary" />
                    Get in Touch
                  </CardTitle>
                  <CardDescription>
                    Multiple ways to connect with our team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                    <h4 className="font-semibold text-lg mb-2">Need Help or Have Feedback?</h4>
                    <p className="text-muted-foreground mb-4">
                      Use the feedback feature inside the web app or contact us directly through the channels below.
                    </p>
                    <Button className="travel-button group" asChild>
                      <Link to="/dashboard">
                        Go to App
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="flex items-center gap-3 p-4 border border-border/20 rounded-lg hover:bg-accent/5 transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Quick Response</p>
                        <p className="text-sm text-muted-foreground">Use in-app feedback for fastest response</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 border border-border/20 rounded-lg hover:bg-accent/5 transition-colors">
                      <Phone className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Direct Contact</p>
                        <p className="text-sm text-muted-foreground">Reach us via email or phone for detailed support</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="travel-card">
                  <CardHeader>
                    <CardTitle className="text-2xl">Contact Information</CardTitle>
                    <CardDescription>
                      Multiple ways to reach our support team
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-lg">
                        <Mail className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email Support</h4>
                        <p className="text-muted-foreground">support@destino.com</p>
                        <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-success to-accent rounded-lg">
                        <Phone className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Phone Support</h4>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-accent to-primary rounded-lg">
                        <LocationIcon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Office Address</h4>
                        <p className="text-muted-foreground">
                          123 Travel Street<br />
                          Adventure City, AC 12345<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>


              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-32 text-center">
            <Card className="travel-card max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">Ready to Explore?</CardTitle>
                <CardDescription className="text-lg">
                  Join thousands of travelers who trust Destino for their adventures
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