"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

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
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCategories = () => {
      if (containerRef.current && navRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const moreButtonWidth = 150;
        let availableWidth = containerWidth - moreButtonWidth;
        const visible: Category[] = [];
        const hidden: Category[] = [];

        categories.forEach((category) => {
          const categoryWidth = category.name.length * 10;
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
      const scrollThreshold = 200; // The point where the element should become active (200px from the top)

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
    console.log("Element: ", element);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className=" bg-white z-10 shadow-sm w-full">
      <nav
        ref={navRef}
        className="flex items-center justify-start px-4 py-2 bg-slate-500 sticky top-[69px] h-10"
      >
        {visibleCategories.map((category) => (
          <Button
            key={category.id}
            id={category.id}
            variant={activeCategory === category.id ? "default" : "ghost"}
            className={`px-4 py-2 h-auto text-sm font-medium whitespace-nowrap ${
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
                className="px-4 py-2 h-auto text-sm font-medium text-gray-600 hover:bg-gray-100 whitespace-nowrap"
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
          className="bg-gray-100 h-80"
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

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { ChevronDown } from "lucide-react";
// import { Button } from "../components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../components/ui/dropdown-menu";

// type Category = {
//   id: string;
//   name: string;
//   width?: number;
// };

// const categories: Category[] = [
//   { id: "platters", name: "Platters" },
//   { id: "create-your-own", name: "Create your own" },
//   { id: "salads", name: "Salads" },
//   { id: "gym-food", name: "Gym food" },
//   { id: "hot-power-bowls", name: "Hot Power Bowls" },
//   { id: "rainbow-wraps", name: "Rainbow Wraps" },
//   { id: "vegan-menu", name: "Vegan Menu" },
//   { id: "snacks-and-sides", name: "Snacks & Sides" },
//   { id: "yoghurt-and-fruit", name: "Yoghurt & fruit" },
// ];

// export default function CategoryNav() {
//   const [visibleCategories, setVisibleCategories] =
//     useState<Category[]>(categories);
//   const [hiddenCategories, setHiddenCategories] = useState<Category[]>([]);
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const navRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [categoriesWithWidth, setCategoriesWithWidth] =
//     useState<Category[]>(categories);

//   useEffect(() => {
//     const measureCategoryWidths = () => {
//       const tempDiv = document.createElement("div");
//       tempDiv.style.visibility = "hidden";
//       tempDiv.style.position = "absolute";
//       tempDiv.style.whiteSpace = "nowrap";
//       document.body.appendChild(tempDiv);

//       const measuredCategories = categories.map((category) => {
//         tempDiv.textContent = category.name;
//         const width = tempDiv.offsetWidth + 40; // Add padding (16px on each side)
//         return { ...category, width };
//       });

//       document.body.removeChild(tempDiv);
//       setCategoriesWithWidth(measuredCategories);
//     };

//     measureCategoryWidths();
//   }, []);

//   useEffect(() => {
//     const updateCategories = () => {
//       if (containerRef.current) {
//         const containerWidth = containerRef.current.offsetWidth;
//         const moreButtonWidth = 100; // Estimated width of the 'More' button
//         let availableWidth = containerWidth - moreButtonWidth;
//         const visible: Category[] = [];
//         const hidden: Category[] = [];

//         categoriesWithWidth.forEach((category) => {
//           if (availableWidth - (category.width || 0) >= 0) {
//             visible.push(category);
//             availableWidth -= category.width || 0;
//           } else {
//             hidden.push(category);
//           }
//         });

//         setVisibleCategories(visible);
//         setHiddenCategories(hidden);
//       }
//     };

//     updateCategories();
//     window.addEventListener("resize", updateCategories);
//     return () => window.removeEventListener("resize", updateCategories);
//   }, [categoriesWithWidth]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + 169; // 100px offset for nav height

//       categories.forEach((category) => {
//         const element = document.getElementById(`section-${category.id}`);
//         if (element) {
//           const { top, bottom } = element.getBoundingClientRect();
//           if (top <= scrollPosition && bottom > scrollPosition) {
//             setActiveCategory(category.id);
//           }
//         }
//       });
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleCategoryClick = (categoryId: string) => {
//     const element = document.getElementById(`section-${categoryId}`);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       className="sticky bg-white z-10 shadow-sm w-full top-[69px]"
//     >
//       <nav ref={navRef} className="flex items-center justify-start px-4 py-2">
//         {visibleCategories.map((category) => (
//           <Button
//             key={category.id}
//             variant={activeCategory === category.id ? "default" : "ghost"}
//             className={`px-4 py-2 h-auto text-sm font-medium whitespace-nowrap ${
//               activeCategory === category.id
//                 ? "bg-teal-500 text-white hover:bg-teal-600"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//             onClick={() => handleCategoryClick(category.id)}
//           >
//             {category.name}
//           </Button>
//         ))}
//         {hiddenCategories.length > 0 && (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 className="px-4 py-2 h-auto text-sm font-medium text-gray-600 hover:bg-gray-100 whitespace-nowrap"
//               >
//                 More <ChevronDown className="ml-1 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               {hiddenCategories.map((category) => (
//                 <DropdownMenuItem
//                   key={category.id}
//                   onClick={() => handleCategoryClick(category.id)}
//                 >
//                   {category.name}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         )}
//       </nav>
//       {/* Mock content for demonstration */}
//       {categories.map((category) => (
//         <div
//           key={category.id}
//           id={`section-${category.id}`}
//           className="min-h-screen p-4"
//         >
//           <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
//           <p>This is the content for the {category.name} section.</p>
//         </div>
//       ))}
//     </div>
//   );
// }
