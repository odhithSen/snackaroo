import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { MoveLeft, MoveRight, PlusIcon } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  price: number;
  image: string;
}

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: "Chipotle salad",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6902699672035287",
  },
  {
    id: 2,
    name: "Chipotle salad wfuhf9fehu weifweufh",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6513165031846466",
  },
  {
    id: 3,
    name: "Chipotle salad",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6902699672035287",
  },
  {
    id: 4,
    name: "Chipotle salad wfuhf9fehu weifweufh",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6513165031846466",
  },
  {
    id: 5,
    name: "Chipotle salad",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6902699672035287",
  },
  {
    id: 6,
    name: "Chipotle salad wfuhf9fehu weifweufh",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6513165031846466",
  },
  {
    id: 7,
    name: "Chipotle salad",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6902699672035287",
  },
  {
    id: 8,
    name: "Chipotle salad wfuhf9fehu weifweufh",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6513165031846466",
  },
  {
    id: 9,
    name: "Chipotle salad",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6902699672035287",
  },
  {
    id: 10,
    name: "Chipotle salad wfuhf9fehu weifweufh",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6513165031846466",
  },
  {
    id: 11,
    name: "Chipotle salad",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6902699672035287",
  },
  {
    id: 12,
    name: "Chipotle salad wfuhf9fehu weifweufh",
    calories: 524,
    price: 11.99,
    image: "https://loremflickr.com/320/320/food?lock=6513165031846466",
  },
];

export default function Component() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -125 : 125;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-8 pt-4">
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex overflow-x-scroll md:scrollbar-hide md:overflow-x-auto md:scrollbar-hide md:snap-x md:snap-mandatory"
          onScroll={checkScrollButtons}
        >
          {foodItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[125px] snap-start mx-[10px]"
            >
              <Card className="border border-gray-200 rounded-lg shadow-md h-[266px]">
                <CardContent className="p-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-28 object-cover rounded-t-lg mb-2"
                  />
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 px-2 min-h-10">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 px-2">
                    {item.calories} kcal
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 px-2">
                    £{item.price.toFixed(2)}
                  </p>
                  <div className="text-center">
                    <Button
                      variant="outline"
                      className="w-[107px] h-[34px] mt-2 text-xs sm:text-sm rounded-sm "
                    >
                      <PlusIcon className="h-5 w-5 text-teal-500" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        {canScrollLeft && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden sm:flex rounded-full"
            onClick={() => scroll("left")}
          >
            <MoveLeft className="h-5 w-5 text-teal-500" />
          </Button>
        )}
        {canScrollRight && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 translate-x-1/2 hidden sm:flex rounded-full"
            onClick={() => scroll("right")}
          >
            <MoveRight className="h-5 w-5 text-teal-500" />
          </Button>
        )}
      </div>
    </div>
  );
}
