import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { ArrowLeft, ChevronRight, Info, Star } from "lucide-react";
import { Button } from "src/components/ui/button";
import DishCard from "src/components/cards/dish-card";
import Basket from "src/components/basket";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { fetchRestaurant } from "src/slices/restaurantSlice";
import { fetchDishCategories } from "src/slices/dishCategoriesSlice";
import axios from "axios";
import { RestaurantDishItem } from "src/models/restaurat-dish-item";

export const RestaurantPage: React.FC = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const restaurant = useSelector(
    (state: RootState) => state.restaurant.restaurant
  );
  const restaurantLoading = useSelector(
    (state: RootState) => state.restaurant.loading
  );
  const restaurantError = useSelector(
    (state: RootState) => state.restaurant.error
  );

  const dishCategories = useSelector(
    (state: RootState) => state.dishCategories.dish_categories
  );
  const dishCategoriesLoading = useSelector(
    (state: RootState) => state.dishCategories.loading
  );
  const dishCategoriesError = useSelector(
    (state: RootState) => state.dishCategories.error
  );

  const handleCategoryClick = (categoryId: string) => {
    const element = document.getElementById(`section${categoryId}`);
    if (element) {
      setActiveCategory(categoryId);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    dispatch(fetchRestaurant({ restaurantID: Number(restaurantId) }));
  }, [dispatch, restaurantId]);

  useEffect(() => {
    dispatch(fetchDishCategories({ restaurantID: Number(restaurantId) }));
  }, [dispatch, restaurantId]);

  const [dishItems, setDishItems] = useState<RestaurantDishItem[]>([]);
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const resp = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/public/restaurants/${restaurantId}/dishes`
        );
        setDishItems(resp.data.dishes);
      } catch (error) {
        // TODO: display error message to user
        console.error("Error fetching dishes", error);
      }
    };
    fetchDishes();
  }, [restaurantId]);

  if (restaurantLoading || dishCategoriesLoading) {
    return <div>Loading...</div>;
  }

  if (restaurantError) {
    return <div>Error fetching restaurant: {restaurantError}</div>;
  }

  if (dishCategoriesError) {
    return <div>Error fetching categories: {dishCategoriesError}</div>;
  }

  return (
    <PageLayout>
      <>
        {/* remove this before moving to production */}
        <h1 className="m-3 text-xl font-bold">This is the restaurant page</h1>

        {/* Restaurant page hero section */}
        <div className="w-full bg-white">
          <div className="max-w-[1775px] mx-auto p-6">
            <button
              className="text-teal-500 flex items-center mb-4"
              onClick={() => navigate(-1)}
            >
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
                  {restaurant?.name}
                </h1>
                <p className="text-gray-600 mb-2">{restaurant?.tag_line}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {/* Can render the open time using restaurant open time api */}
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

                {/* Can render the reviews and rating from thr reviews api */}
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
        <div className="sticky top-[69px] bg-white z-10 shadow-sm">
          <nav className="flex items-center justify-start border-y border-[#eaeaea] shadow-sm overflow-x-auto px-4 py-5">
            {dishCategories?.map((category) => (
              <div
                id={"category:" + category.dish_category_id.toString()}
                key={"category:" + category.dish_category_id}
              >
                <Button
                  id={category.dish_category_name}
                  variant={
                    activeCategory === category.dish_category_id.toString()
                      ? "default"
                      : "ghost"
                  }
                  className={`mx-2 px-4 py-1 h-auto text-sm font-normal rounded-2xl ${
                    activeCategory === category.dish_category_id.toString()
                      ? "bg-teal-500 text-white hover:bg-teal-600"
                      : "text-teal-500 hover:bg-gray-100 hover:text-teal-500"
                  }`}
                  onClick={() =>
                    handleCategoryClick(category.dish_category_id.toString())
                  }
                >
                  {category.dish_category_name}
                </Button>
              </div>
            ))}

            {/* {hiddenCategories.length > 0 && (
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
                        key={category.dish_category_id}
                        onClick={() =>
                          handleCategoryClick(category.dish_category_name)
                        }
                        className="px-4 py-3 font-normal"
                      >
                        {category.dish_category_name}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )} */}
          </nav>
        </div>
        <div>
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

          <Basket />

          {/* Mock content for demonstration */}
          <div>
            {dishCategories?.map((category) => (
              <div
                key={`section${category.dish_category_id}`}
                id={`section${category.dish_category_id}`}
                className="p-4"
              >
                <div className="h-[140px]"></div>
                <h2 className="text-2xl font-bold mb-4">
                  {category.dish_category_name}
                </h2>

                <div>
                  {dishItems
                    .filter(
                      (dish) =>
                        dish.dish_category_id === category.dish_category_id
                    )
                    .map((dish) => (
                      <DishCard
                        key={dish.dish_id + Math.random()}
                        name={dish.dish_name}
                        description={dish.dish_description}
                        price={dish?.base_price ?? 0}
                        imageUrl={dish.thumbnail_image_url}
                        isAvailable={dish.isAvailable ?? true}
                        ingredients={dish.ingredients}
                        onAddToBasket={() =>
                          console.log(
                            "Add to basket clicked on " + dish.dish_name
                          )
                        }
                        calories={dish.calories}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </PageLayout>
  );
};
