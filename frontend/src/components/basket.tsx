import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Trash2, ChevronRight, HelpCircle, ShoppingBasket } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { BasketItem } from "src/models/basket-item";

interface Fee {
  name: string;
  amount: number;
}

interface BasketProps {
  basketItems: BasketItem[];
  clearBasket: () => void;
}

export default function Basket({ basketItems, clearBasket }: BasketProps) {
  const [riderTip, setRiderTip] = React.useState(0);

  const fees: Fee[] = [
    { name: "Service fee", amount: 0.0 },
    { name: "Delivery fee", amount: 0.0 },
    { name: "Bag fee", amount: 0.0 },
  ];

  const basketSubtotal = basketItems.reduce(
    (total, item) => total + item.dishItem.base_price * item.quantity,
    0
  );
  const feesTotal = fees.reduce((total, fee) => total + fee.amount, 0);
  const orderTotal = basketSubtotal + feesTotal + riderTip;
  const isBasketEmpty = basketItems.length === 0;

  return (
    <Card className="w-full max-w-md mx-auto h-[600px] flex flex-col rounded-sm">
      <CardHeader className="flex flex-row justify-between items-center">
        {!isBasketEmpty && (
          <>
            <CardTitle className="text-xl font-semibold">Your order</CardTitle>
            <Button variant="ghost" size="icon" onClick={clearBasket}>
              <Trash2 className="h-6 w-6 text-teal-500" />
            </Button>
          </>
        )}
      </CardHeader>

      <ScrollArea className="flex-grow" type="always">
        <CardContent className="space-y-4 h-full">
          {isBasketEmpty ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingBasket className="h-16 w-16 mb-4" />
              <p className="text-lg">Your basket is empty</p>
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-lg font-bold mb-2">Basket</h2>
                <div className="border border-gray-200 rounded-sm">
                  {basketItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 mxs-2 border-b border-b-gray-200 rounded-sm hover:bg-gray-100"
                    >
                      <span>
                        {item.quantity}x
                        <span className="ml-3">{item.dishItem.dish_name}</span>
                      </span>
                      <div className="flex items-center">
                        <span className="mr-2">
                          £{item.dishItem.base_price}
                        </span>
                        <ChevronRight className="h-5 w-5 text-teal-500" />
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between items-center px-2 py-3">
                    <span className="font-normal">Basket subtotal</span>
                    <span className="mr-6">£{basketSubtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* <div>
                <h3 className="font-semibold mb-2">People also added</h3>
                <div className="flex space-x-4">
                  {suggestedItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mb-1"
                      />
                      <span className="text-sm font-semibold">{item.name}</span>
                      <span className="text-xs text-gray-500">
                        {item.calories} kcal
                      </span>
                      <span className="text-sm">£{item.price.toFixed(2)}</span>
                      <Button variant="outline" size="icon" className="mt-1">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div> */}

              <div className="px-3 py-2 border border-gray-200 rounded-sm">
                <div className="flex justify-between items-center">
                  <span>Notes for restaurant</span>
                  <Button
                    variant="link"
                    className="text-teal-500 p-0 text-base font-normal"
                  >
                    Add
                  </Button>
                </div>
                <div className="text-sm text-gray-500">No note provided</div>
              </div>

              <div>
                <div className=" w-full flex flex-row items-center justify-between my-2">
                  <h3 className="text-lg font-bold">Fees</h3>
                  <HelpCircle className="h-5 w-5 ml-1 text-teal-500" />
                </div>

                <div className="border border-gray-200 rounded-sm">
                  {fees.map((fee, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center font-normal px-4 py-2"
                    >
                      <span>{fee.name}</span>
                      <span>£{fee.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-100 text-red-600 p-2 rounded-md text-sm">
                Add £5.15 to get 20% off
              </div>

              {/* <div>
                <div className="flex justify-between items-center">
                  <span>Rider tip</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setRiderTip(Math.max(0, riderTip - 0.5))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>£{riderTip.toFixed(2)}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setRiderTip(riderTip + 0.5)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div> */}

              <div className="flex justify-between items-center">
                <span>Order total</span>
                <span className="font-bold">£{orderTotal.toFixed(2)}</span>
              </div>
            </>
          )}
        </CardContent>
      </ScrollArea>

      <CardFooter className={!isBasketEmpty ? `border-t border-gray-200` : ``}>
        <Button
          className={`w-full text-md font-bold rounded-sm py-6 mt-8 ${
            isBasketEmpty
              ? "bg-gray-300 text-gray-500"
              : "bg-teal-500 hover:bg-teal-600 text-white"
          }`}
          disabled={isBasketEmpty}
        >
          Go to checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
