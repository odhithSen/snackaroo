import React, { useEffect, useState, useRef, useCallback } from "react";
import { PageLayout } from "../components/page-layout";
import { ArrowLeft, ChevronRight, ChevronDown, Info, Star } from "lucide-react";
import { Button } from "src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";

//Mock data
type Category = {
  id: string;
  name: string;
};

const categories: Category[] = [
  { id: "platters", name: "Platters" },
  { id: "create-your-own", name: "Create your own" },
  { id: "salads", name: "Salads" },
  { id: "gym-food", name: "Gym food" },
  { id: "hot-power-bowls", name: "Hot Power Bowls" },
  { id: "rainbow-wraps", name: "Rainbow Wraps" },
  { id: "vegan-menu", name: "Vegan Menu" },
  { id: "snacks-and-sides", name: "Snacks & Sides" },
  { id: "yoghurt-and-fruit", name: "Yoghurt & fruit" },
];

export const RestaurantPage: React.FC = () => {
  const [visibleCategories, setVisibleCategories] =
    useState<Category[]>(categories);
  const [hiddenCategories, setHiddenCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Category resizing logic
  useEffect(() => {
    const updateCategories = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        let visibleWidth = 0;
        const visible: Category[] = [];
        const hidden: Category[] = [];

        // Batch DOM access to improve performance
        const categoryElements = categories.map((category) =>
          document.getElementById(category.id)
        );

        categoryElements.forEach((element, index) => {
          if (element) {
            const categoryWidth = element.offsetWidth;
            if (visibleWidth + categoryWidth + 100 < containerWidth) {
              visible.push(categories[index]);
              visibleWidth += categoryWidth;
            } else {
              hidden.push(categories[index]);
            }
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

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for nav height
      categories.forEach((category) => {
        const element = document.getElementById(`section-${category.id}`);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= scrollPosition && bottom > scrollPosition) {
            setActiveCategory(category.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Optimized handler for category click
  const handleCategoryClick = useCallback((categoryId: string) => {
    const element = document.getElementById(`section-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <PageLayout>
      <>
        <h1 className="m-3 text-xl font-bold">This is the restaurant page</h1>

        {/* Restaurant page hero section */}
        <div className="w-full bg-white">
          <div className="max-w-[1775px] mx-auto p-6">
            <button className="text-teal-500 flex items-center mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <div className="relative w-full h-48 md:h-full">
                  <img
                    src="https://loremflickr.com/320/320/food,restaurant?lock=1568372147159672"
                    alt="Tossed salad bowls"
                    className="rounded-lg w-full h-full max-w-80"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Tossed - St Martin's Lane
                </h1>
                <p className="text-gray-600 mb-2">Chicken · Salads · Healthy</p>
                <p className="text-sm text-gray-500 mb-4">
                  0.20 miles away · Opens at 11:00 · £7.00 minimum · £0.49
                  delivery
                </p>
                <div className="py-3 mb-4">
                  <button className="w-full flex justify-start items-center text-left">
                    <div className="flex items-center">
                      <div className="w-6 h-6 flex items-center justify-center mr-3">
                        <Info color="#abadad" />
                      </div>
                      <span>Info</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-teal-500 ml-52" />
                  </button>
                  <p className="text-sm text-gray-500 mt-1 ml-9">
                    Map, allergens and hygiene rating
                  </p>
                </div>

                <div className="mb-4">
                  <button className="w-full flex justify-start items-center">
                    <div className="flex items-center">
                      <Star
                        fill="#4d7c1b"
                        strokeWidth={0}
                        className="h-6 w-6 mr-2"
                      />
                      <span className="text-[#4d7c1b]">4.7 Excellent</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-teal-500 ml-24" />
                  </button>
                  <p className="text-sm text-gray-500 mt-1 ml-9">
                    See all 500 reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant category section */}
        <div
          ref={containerRef}
          className="sticky top-0 bg-white z-10 shadow-sm"
        >
          <nav
            ref={navRef}
            className="flex items-center justify-start overflow-x-auto px-4 py-2"
          >
            {visibleCategories.map((category) => (
              <Button
                key={category.id}
                id={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                className={`px-4 py-2 h-auto text-sm font-medium ${
                  activeCategory === category.id
                    ? "bg-teal-500 text-white hover:bg-teal-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </Button>
            ))}
            {hiddenCategories.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="px-4 py-2 h-auto text-sm font-medium text-gray-600 hover:bg-gray-100"
                  >
                    More <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {hiddenCategories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
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
              className="min-h-screen p-4"
            >
              <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
              <p>This is the content for the {category.name} section.</p>
            </div>
          ))}
        </div>
      </>
    </PageLayout>
  );
};
