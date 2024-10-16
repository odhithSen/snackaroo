import { useState } from "react";
import { Button } from "src/components/ui/button";
import { PlusIcon } from "lucide-react";
import DishModal from "../modals/dish-modal";
import { RestaurantDishItem } from "src/models/restaurant-dish-item";

interface DishCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isPopular?: boolean;
  isAvailable: boolean;
  calories: number;
  ingredients: string;
  dishItem: RestaurantDishItem;
  onAddToBasket: (dishItem: RestaurantDishItem, quantity: number) => void;
}

export default function DishCard({
  name,
  description,
  price,
  imageUrl,
  isPopular = false,
  isAvailable,
  calories,
  ingredients,
  dishItem,
  onAddToBasket,
}: DishCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md ${
          !isAvailable ? "opacity-70" : ""
        } cursor-pointer`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex-1 min-w-0 mr-4">
          <h3 className="text-md font-bold text-gray-900 leading-tight line-clamp-1 overflow-hidden text-ellipsis">
            {name}
          </h3>
          {isAvailable ? (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2 xl:min-h-[40px]">
              {description}
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-500">
              Currently not available
            </p>
          )}
          <div className="mt-2 flex items-center">
            <span className="text-base font-normal text-gray-500">
              {calories} kcal
            </span>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-base font-normal text-gray-900">
              £{price}
            </span>
            {isPopular && isAvailable && (
              <span className="ml-2 text-sm font-medium text-orange-500">
                · Popular
              </span>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 w-24 h-24 mr-4 border border-gray-200 rounded-sm">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
        <Button
          size="icon"
          variant="ghost"
          className={`flex-shrink-0 h-24 w-10 rounded-sm border border-gray-200 hover:border-gray-300 hover:bg-white ${
            isAvailable ? "text-teal-500 hover:text-teal-600" : "text-gray-300"
          }`}
          disabled={!isAvailable}
          aria-label={`Add ${name} to basket`}
          onClick={(e) => {
            e.stopPropagation();
            if (isAvailable) setIsModalOpen(true);
          }}
        >
          <PlusIcon className="h-5 w-5" />
        </Button>
      </div>
      <DishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={name}
        description={description}
        price={price}
        imageUrl={imageUrl}
        isAvailable={isAvailable}
        ingredients={ingredients}
        dishItem={dishItem}
        onAddToBasket={onAddToBasket}
      />
    </>
  );
}
