"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { RestaurantDishCategory } from "src/slices/dishCategoriesSlice";

interface CategoryNavBarProps {
  dishCategories: RestaurantDishCategory[];
}
export default function CategoryNavBar({
  dishCategories,
}: CategoryNavBarProps) {
  const [visibleCategories, setVisibleCategories] =
    useState<RestaurantDishCategory[]>(dishCategories);
  const [hiddenCategories, setHiddenCategories] = useState<
    RestaurantDishCategory[]
  >([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(
    dishCategories[0]?.dish_category_id
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCategories = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;

        if (containerWidth < 600) {
          setVisibleCategories(dishCategories);
          setHiddenCategories([]);
          return;
        }

        const moreButtonWidth = 150;
        let availableWidth = containerWidth - moreButtonWidth;
        const visible: RestaurantDishCategory[] = [];
        const hidden: RestaurantDishCategory[] = [];

        dishCategories.forEach((category) => {
          const categoryWidth = category.dish_category_name.length * 16;
          if (availableWidth - categoryWidth >= 0) {
            visible.push(category);
            availableWidth -= categoryWidth;
          } else {
            hidden.push(category);
          }
        });

        setVisibleCategories(visible);
        setHiddenCategories(hidden);
      }
    };

    updateCategories();
    window.addEventListener("resize", updateCategories);
    return () => window.removeEventListener("resize", updateCategories);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 230; // The point where the element should become active (200px from the top)

      dishCategories.forEach((category) => {
        const element = document.getElementById(
          `section-${category.dish_category_id}`
        );
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= scrollThreshold && bottom > scrollThreshold) {
            setActiveCategory(category.dish_category_id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    const element = document.getElementById(`section-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className=" bg-white z-10 shadow-sm w-full">
      <nav className="flex items-center justify-start px-4 py-5 sticky top-[69px] border-y border-[#eaeaea] bg-white shadow-sm overflow-x-auto scrollbar-hide">
        {visibleCategories.map((category) => (
          <Button
            key={category.dish_category_id}
            id={category.dish_category_id.toString()}
            variant={
              activeCategory === category?.dish_category_id
                ? "default"
                : "ghost"
            }
            className={`mx-2 px-4 py-1 h-auto text-sm font-normal rounded-2xl whitespace-nowrap ${
              activeCategory === category.dish_category_id
                ? "bg-teal-500 text-white hover:bg-teal-600 font-semibold"
                : "text-teal-500 hover:bg-gray-100 hover:text-teal-500"
            }`}
            onClick={() =>
              handleCategoryClick(category.dish_category_id.toString())
            }
          >
            {category.dish_category_name}
          </Button>
        ))}
        {hiddenCategories.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {hiddenCategories.some(
                (category) => category.dish_category_id === activeCategory
              ) ? (
                <Button
                  variant="ghost"
                  className="ml-12 px-4 py-1 h-auto rounded-2xl bg-teal-500 text-white font-semibold"
                >
                  {
                    dishCategories.find(
                      (category) => category.dish_category_id === activeCategory
                    )?.dish_category_name
                  }
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="ml-12 px-4 py-1 h-auto rounded-2xl text-sm font-normal text-teal-500 hover:bg-gray-100 hover:text-teal-500"
                >
                  More
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {hiddenCategories.map((category) => (
                <DropdownMenuItem
                  key={category.dish_category_id}
                  onClick={() =>
                    handleCategoryClick(category.dish_category_id.toString())
                  }
                  className="px-4 py-3 font-normal min-w-[200px] border-b border-gray-200"
                >
                  {category.dish_category_name}{" "}
                  {category.dish_category_id === activeCategory && (
                    <Check className="ml-2 h-5 w-5" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </div>
  );
}
