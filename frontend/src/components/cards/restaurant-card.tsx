import { Star } from "lucide-react";

interface RestaurantProps {
  name: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  distance?: number;
  deliveryFee?: number;
  minDeliveryTime?: number;
  maxDeliveryTime?: number;
}

export default function RestaurantCard({
  name,
  imageUrl,
  rating,
  reviewCount,
  distance,
  deliveryFee,
  minDeliveryTime,
  maxDeliveryTime,
}: RestaurantProps) {
  return (
    <div className="w-[270px] rounded overflow-hidden shadow-lg bg-white hover:shadow-2xl">
      <div className="relative">
        <img
          className="w-full h-36 object-cover"
          src={imageUrl}
          alt={`${name} food`}
        />
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-xl text-sm font-semibold">
          {minDeliveryTime ? minDeliveryTime : 30} -{" "}
          {maxDeliveryTime ? maxDeliveryTime : 50} min
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </div>

        <div className="flex items-center mb-2">
          <Star fill="#4d7c1b" strokeWidth={0} className="h-5 w-5" />
          <span className="text-sm text-[#4d7c1b]">
            {rating ? rating : (4.3).toFixed(1)}
            {rating && rating > 4.5 ? " Excellent" : " Very Good"}
          </span>
          <span className="text-sm text-gray-500 ml-1">
            ({reviewCount ? reviewCount : 100}+)
          </span>
        </div>
        <p className="text-gray-700 text-sm">
          {(distance ? distance : 8).toFixed(1)} mi • £
          {(deliveryFee ? deliveryFee : 5.8).toFixed(2)} delivery
        </p>
      </div>
    </div>
  );
}
