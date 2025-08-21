import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Phone, Globe, Calendar } from "lucide-react";

interface TravelCardProps {
  type: "hotel" | "restaurant" | "attraction";
  title: string;
  description: string;
  location: string;
  rating?: number;
  price?: string;
  image?: string;
  contact?: string;
  website?: string;
  openHours?: string;
  className?: string;
  style?: React.CSSProperties;
}

const TravelCard: React.FC<TravelCardProps> = ({
  type,
  title,
  description,
  location,
  rating,
  price,
  image,
  contact,
  website,
  openHours,
  className,
  style
}) => {
  const getTypeColor = () => {
    switch (type) {
      case "hotel":
        return "bg-blue-500/10 text-blue-400";
      case "restaurant":
        return "bg-orange-500/10 text-orange-400";
      case "attraction":
        return "bg-green-500/10 text-green-400";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "hotel":
        return "Hotel";
      case "restaurant":
        return "Restaurant";
      case "attraction":
        return "Attraction";
      default:
        return "Location";
    }
  };

  return (
    <Card className={`travel-card group ${className}`} style={style}>
      {image && (
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge className={getTypeColor()}>
              {getTypeLabel()}
            </Badge>
          </div>
          {rating && (
            <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 rounded-lg px-2 py-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm font-medium">{rating}</span>
            </div>
          )}
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground line-clamp-2">
            {title}
          </CardTitle>
          {price && (
            <div className="text-right">
              <span className="text-sm text-muted-foreground">from</span>
              <div className="text-lg font-bold text-primary">{price}</div>
            </div>
          )}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{location}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>

        {(contact || website || openHours) && (
          <div className="space-y-2">
            {contact && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span>{contact}</span>
              </div>
            )}
            
            {website && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Globe className="h-4 w-4 mr-2" />
                <a 
                  href={website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visit Website
                </a>
              </div>
            )}
            
            {openHours && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>{openHours}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <Button size="sm" className="travel-button flex-1">
            View Details
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelCard;