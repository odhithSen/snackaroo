import React from "react";
import { Star } from "lucide-react";

interface RestaurantProps {
  name: string;
  imageUrl: string;
  rating: number;
  isNew: boolean;
  distance: number;
  deliveryFee: number;
  minDeliveryTime: number;
  maxDeliveryTime: number;
}

export default function RestaurantCard({
  name,
  imageUrl,
  rating,
  isNew,
  distance,
  deliveryFee,
  minDeliveryTime,
  maxDeliveryTime,
}: RestaurantProps) {
  return (
    <div className="max-w-[18rem] rounded overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <img
          className="w-full h-36 object-cover"
          src={imageUrl}
          alt={`${name} food`}
        />
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-semibold">
          {minDeliveryTime} - {maxDeliveryTime} min
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div className="flex items-center mb-2">
          <Star className="h-5 w-5 text-green-500 mr-1" />
          <span className="text-sm text-gray-700">{rating.toFixed(1)}</span>
          {isNew && (
            <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              New on Deliveroo
            </span>
          )}
        </div>
        <p className="text-gray-700 text-sm">
          {distance.toFixed(1)} mi • £{deliveryFee.toFixed(2)} delivery
        </p>
      </div>
    </div>
  );
}
