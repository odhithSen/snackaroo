import React, { useEffect, useState, useRef } from "react";
import { PageLayout } from "../components/page-layout";
import { ArrowLeft, ChevronRight, ChevronDown, Info, Star } from "lucide-react";
import { Button } from "src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import DishCard from "src/components/cards/dish-card";

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
  // stuff for category bar
  const [visibleCategories, setVisibleCategories] =
    useState<Category[]>(categories);
  const [hiddenCategories, setHiddenCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCategories = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        let visibleWidth = 0;
        const visible: Category[] = [];
        const hidden: Category[] = [];

        categories.forEach((category) => {
          const categoryElement = document.getElementById(category.id);
          if (categoryElement) {
            const categoryWidth = categoryElement.offsetWidth;
            if (visibleWidth + categoryWidth + 300 < containerWidth) {
              // 100px buffer for "More" button
              visible.push(category);
              visibleWidth += categoryWidth;
            } else {
              hidden.push(category);
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // 100px offset for nav height

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

  const handleCategoryClick = (categoryId: string) => {
    const element = document.getElementById(`section-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
                <h1 className="text-2xl md:text-4xl font-bold mb-2">
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
            className="flex items-center justify-start border-y border-[#eaeaea] shadow-sm overflow-x-auto px-4 py-5"
          >
            {visibleCategories.map((category) => (
              <Button
                key={category.id}
                id={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                className={`mx-2 px-4 py-1 h-auto text-sm font-normal rounded-2xl ${
                  activeCategory === category.id
                    ? "bg-teal-500 text-white hover:bg-teal-600"
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
                  <Button
                    variant="ghost"
                    className="ml-16 px-4 py-1 h-auto rounded-2xl text-sm font-normal text-teal-500 hover:bg-gray-100 hover:text-teal-500"
                  >
                    More <ChevronDown className="ml-2 h-5 w-5 text-teal-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {hiddenCategories.map((category) => (
                    <>
                      <DropdownMenuItem
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="px-4 py-3 font-normal"
                      >
                        {category.name}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          <div className="my-5">
            <DishCard
              name="Chicken Caesar Salad"
              description="Romaine lettuce, grilled chicken, croutons, parmesan cheese, Caesar dressing"
              price={7.99}
              imageUrl="https://loremflickr.com/320/320/food,restaurant?lock=1568372147159672"
              isAvailable={true}
              ingredients="Contains sulphur dioxide/sulphites, gluten, soybeans"
              onAddToBasket={() => console.log("Add to basket")}
              calories={450}
            />
          </div>

          <div className="my-5">
            <DishCard
              name="Chicken Caesar Salad"
              description="Romaine lettuce, grilled chicken, croutons, parmesan cheese, Caesar dressing"
              price={7.99}
              imageUrl="https://loremflickr.com/320/320/food,restaurant?lock=1568372147159672"
              isAvailable={false}
              ingredients="Contains known allergens"
              onAddToBasket={() => console.log("Add to basket")}
              calories={450}
            />
          </div>

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
