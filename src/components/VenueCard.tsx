// src/components/VenueCard.tsx
import React from "react";

export interface Venue {
  id: string;
  name: string;
  media: Array<{ url: string; alt?: string }>;
  price: number;
  location?: { city?: string; country?: string };
}

interface VenueCardProps {
  venue: Venue;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  // pick the first image or fall back to a placeholder
  const imageUrl = venue.media[0]?.url ?? "/placeholder.jpg";
  const imageAlt = venue.media[0]?.alt ?? venue.name;

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={imageUrl}
        alt={imageAlt}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{venue.name}</h3>
        {venue.location && (
          <p className="text-sm text-gray-600">
            {venue.location.city}, {venue.location.country}
          </p>
        )}
        <p className="mt-2 font-bold">${venue.price}/night</p>
      </div>
    </div>
  );
};

export default VenueCard;
