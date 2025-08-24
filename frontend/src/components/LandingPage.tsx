import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        aria-label="Travel background video showing scenic destinations"
      >
        <source src="/videos/LandingPage.mp4" type="video/mp4" />
        {/* Fallback image if video fails to load */}
        <img
          src="/images/landing-fallback.jpg"
          alt="Scenic travel destination"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </video>

      {/* Overlay: Semi-transparent dark gradient for readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 animate-slide-up text-white">
          Plan Your Dream{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-float">
            Adventure
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in text-white/90">
          Discover amazing destinations, find the perfect route, and explore local gems 
          with our intelligent travel planning platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Button
            size="lg"
            className="travel-button text-lg px-8 py-4 group"
            asChild
          >
            <Link to="/dashboard">
              Start Planning
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-4 text-white border-white/30 hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link to="/results">
              Explore Destinations
            </Link>
          </Button>
        </div>
      </div>

      {/* Optional: Soft gradient at bottom to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-30"></div>
    </div>
  );
};

export default LandingPage;