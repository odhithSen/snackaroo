"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { randomBytes } from "crypto";

type Category = {
  id: string;
  name: string;
};

const categories: Category[] = [
  { id: "create-your-own", name: "Create your own" },
  { id: "salads", name: "Salads" },
  { id: "gym-food", name: "Gym food" },
  { id: "hot-power-bowls", name: "Hot Power Bowls" },
  { id: "rainbow-wraps", name: "Rainbow Wraps" },
  { id: "vegan-menu", name: "Vegan Menu" },
  { id: "snacks-and-sides", name: "Snacks & Sides" },
  { id: "yoghurt-and-fruit", name: "Yoghurt & fruit" },
];

export default function CategoryNavBar() {
  const [visibleCategories, setVisibleCategories] =
    useState<Category[]>(categories);
  const [hiddenCategories, setHiddenCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categories[0]?.id
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCategories = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const moreButtonWidth = 150;
        let availableWidth = containerWidth - moreButtonWidth;
        const visible: Category[] = [];
        const hidden: Category[] = [];

        categories.forEach((category) => {
          const categoryWidth = category.name.length * 14;
          if (availableWidth - categoryWidth >= 0) {
            visible.push(category);
            availableWidth -= categoryWidth;
          } else {
            hidden.push(category);
          }
        });

        setVisibleCategories(visible);
        setHiddenCategories(hidden);
        console.log("Visible: ", visible.length, "Hidden: ", hidden.length);
      }
    };

    updateCategories();
    window.addEventListener("resize", updateCategories);
    return () => window.removeEventListener("resize", updateCategories);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 230; // The point where the element should become active (200px from the top)

      categories.forEach((category) => {
        const element = document.getElementById(`section-${category.id}`);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= scrollThreshold && bottom > scrollThreshold) {
            setActiveCategory(category.id);
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
      <nav className="flex items-center justify-start px-4 py-5 sticky top-[69px] border-y border-[#eaeaea] bg-white shadow-sm">
        {visibleCategories.map((category) => (
          <Button
            key={category.id}
            id={category.id}
            variant={activeCategory === category.id ? "default" : "ghost"}
            className={`mx-2 px-4 py-1 h-auto text-sm font-normal rounded-2xl whitespace-nowrap ${
              activeCategory === category.id
                ? "bg-teal-500 text-white hover:bg-teal-600 font-semibold"
                : "text-teal-500 hover:bg-gray-100 hover:text-teal-500"
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </Button>
        ))}
        {hiddenCategories.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {hiddenCategories.some(
                (category) => category.id === activeCategory
              ) ? (
                <Button
                  variant="ghost"
                  className="ml-12 px-4 py-1 h-auto rounded-2xl bg-teal-500 text-white font-semibold"
                >
                  {
                    categories.find(
                      (category) => category.id === activeCategory
                    )?.name
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
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="px-4 py-3 font-normal min-w-[200px] border-b border-gray-200"
                >
                  {category.name}{" "}
                  {category.id === activeCategory && (
                    <Check className="ml-2 h-5 w-5" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>

      {/* Mock content for demonstration */}
      {categories.map((category) => (
        <div
          key={category.id}
          id={`section-${category.id}`}
          className="bg-gray-100 h-[1000px] scroll-mt-[140px] p-4"
        >
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <p>
            This is the content for the {category.name} section.{" "}
            {`section-${category.id}`}
          </p>
        </div>
      ))}
    </div>
  );
}
