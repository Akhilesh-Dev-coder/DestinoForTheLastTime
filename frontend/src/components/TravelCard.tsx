import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Clock, Globe, Heart, Share2, ExternalLink, Navigation, Bookmark } from "lucide-react";

interface TravelCardProps {
  type: 'hotel' | 'restaurant' | 'attraction';
  title: string;
  description: string;
  location: string;
  rating: number;
  price?: string;
  image: string;
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
  className = '',
  style = {}
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    const message = !isFavorite ? `❤️ Added ${title} to favorites!` : `💔 Removed ${title} from favorites!`;
    alert(message);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    const message = !isBookmarked ? `🔖 Bookmarked ${title}!` : `📖 Removed bookmark for ${title}!`;
    alert(message);
  };

  const handleShare = () => {
    const shareText = `Check out ${title} - ${description} Location: ${location}`;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: shareText,
        url: website || window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText + (website ? ` Website: ${website}` : ''))
        .then(() => alert('🔗 Details copied to clipboard!'))
        .catch(() => alert('📤 Share: ' + shareText));
    }
  };

  const handleCall = () => {
    if (contact) {
      window.open(`tel:${contact}`, '_self');
      alert(`📞 Calling ${title} at ${contact}`);
    }
  };

  const handleWebsite = () => {
    if (website) {
      window.open(website, '_blank');
    } else {
      alert('🌐 Website not available for this location');
    }
  };

  const handleGetDirections = () => {
    const query = encodeURIComponent(`${title} ${location}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapsUrl, '_blank');
    alert(`🗺️ Opening directions to ${title}...`);
  };

  const handleBookNow = () => {
    const typeMessage = {
      hotel: `🏨 Booking ${title}... Redirecting to reservation system!`,
      restaurant: `🍽️ Making reservation at ${title}... Opening booking platform!`,
      attraction: `🎫 Booking tickets for ${title}... Opening ticket portal!`
    };
    alert(typeMessage[type]);
  };

  const handleViewDetails = () => {
    const details = {
      title,
      description,
      location,
      rating,
      price,
      contact,
      website,
      openHours,
      type
    };
    
    alert(`📋 ${title} Details:\n\n📍 ${location}\n⭐ Rating: ${rating}/5\n${price ? `💰 ${price}\n` : ''}${contact ? `📞 ${contact}\n` : ''}${openHours ? `🕒 ${openHours}\n` : ''}${website ? `🌐 ${website}` : ''}`);
  };

  const getTypeColor = () => {
    switch (type) {
      case 'hotel': return 'bg-blue-500/10 text-blue-600';
      case 'restaurant': return 'bg-green-500/10 text-green-600';
      case 'attraction': return 'bg-purple-500/10 text-purple-600';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'hotel': return '🏨';
      case 'restaurant': return '🍽️';
      case 'attraction': return '🎫';
    }
  };

  return (
    <Card className={`travel-card overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`} style={style}>
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop';
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge className={getTypeColor()}>
            {getTypeIcon()} {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
            onClick={handleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
            onClick={handleBookmark}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'}`} />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Location */}
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Price */}
        {price && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-primary">{price}</span>
            {openHours && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span className="text-xs">{openHours}</span>
              </div>
            )}
          </div>
        )}

        {/* Contact Info */}
        <div className="flex gap-2">
          {contact && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-8 text-xs"
              onClick={handleCall}
            >
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
          )}
          {website && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-8 text-xs"
              onClick={handleWebsite}
            >
              <Globe className="h-3 w-3 mr-1" />
              Website
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs"
            onClick={handleGetDirections}
          >
            <Navigation className="h-3 w-3 mr-1" />
            Directions
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={handleViewDetails}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Details
          </Button>
          <Button
            size="sm"
            className="flex-1 travel-button"
            onClick={handleBookNow}
          >
            {type === 'hotel' ? '🏨 Book' : type === 'restaurant' ? '🍽️ Reserve' : '🎫 Tickets'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="px-3"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelCard;