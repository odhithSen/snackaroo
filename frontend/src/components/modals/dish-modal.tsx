import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon, MinusIcon, XIcon } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { RestaurantDishItem } from "src/models/restaurant-dish-item";

interface DishModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  ingredients: string;
  dishItem: RestaurantDishItem;
  onAddToBasket: (dishItem: RestaurantDishItem, quantity: number) => void;
}

export default function DishModal({
  isOpen,
  onClose,
  name,
  description,
  price,
  imageUrl,
  isAvailable,
  ingredients,
  dishItem,
  onAddToBasket,
}: DishModalProps) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToBasket = () => {
    onAddToBasket(dishItem, quantity);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle className="sr-only" id="dialog-title">
        Dialog for dish {name}
      </DialogTitle>
      <DialogContent
        className="sm:max-w-[500px] p-0 overflow-hidden"
        id="dialog-description"
      >
        <div className="relative">
          <img src={imageUrl} alt={name} className="w-full h-72 object-cover" />
          <Button
            className="absolute right-2 top-2 rounded-full bg-white w-8 h-8 p-0"
            onClick={onClose}
          >
            <XIcon className="h-5 w-5 text-teal-500" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className=" pb-4 text-normal text-gray-600 mb-4 border-b border-gray-200">
            {description}
          </p>
          <div className="mb-4">
            <p className=" pb-1 text-sm font-semibold text-gray-600">
              {ingredients}
            </p>
            <p className="text-sm text-gray-600">
              Questions about allergens, ingredients or cooking methods?
            </p>
            <p className="pb-4 text-sm text-teal-500 border-b border-gray-200">
              Please contact the restaurant.
            </p>
          </div>

          <div className="flex items-center justify-center my-5">
            <div className="flex items-center space-x-12">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={quantity === 1 || !isAvailable}
                className={`rounded-full w-6 h-6 p-0 border-2 border-teal-500 text-teal-500 ${
                  (quantity === 1 || !isAvailable) &&
                  "text-gray-300 border-gray-300"
                }`}
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="text-lg font-bold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={!isAvailable}
                className={`rounded-full w-6 h-6 p-0 border-2 border-teal-500 text-teal-500 ${
                  !isAvailable && "text-gray-300 border-gray-300"
                }`}
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            className={`w-full bg-teal-500 hover:bg-teal-600 text-white text-md font-bold py-6 rounded-sm ${
              !isAvailable && "bg-gray-300 text-gray-600"
            }`}
            disabled={!isAvailable}
            onClick={handleAddToBasket}
          >
            Add for £{(price * quantity).toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
