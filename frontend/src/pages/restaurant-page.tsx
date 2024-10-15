import React, { useEffect, useState, lazy, Suspense } from "react";
import { PageLayout } from "../components/page-layout";
import { ArrowLeft, ChevronRight, Info, Star } from "lucide-react";
import DishCard from "src/components/cards/dish-card";
import Basket from "src/components/basket";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { fetchRestaurant } from "src/slices/restaurantSlice";
import { fetchDishCategories } from "src/slices/dishCategoriesSlice";
import { RestaurantDishItem } from "src/models/restaurant-dish-item";
import { BasketItem } from "src/models/basket-item";
import RestaurantInfoModal from "src/components/modals/restaurant-info-modal";
import { useApi } from "src/hooks/useApi";
import { PageLoader } from "src/components/page-loader";
import { ReviewsMetaData } from "src/models/restaurant-review";
import Swal from "sweetalert2";
import { useLocalStorage } from "usehooks-ts";
import CategoryNavbar from "src/components/category-navbar";
import FoodCarousel from "src/components/food-carousel";

export const RestaurantPage: React.FC = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [basketItems, setBasketItems] = useLocalStorage<BasketItem[]>(
    `basket_${restaurantId}`,
    []
  );

  const ReviewModal = lazy(() => import("src/components/modals/review-modal"));

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

  const addToBasket = (dishItem: RestaurantDishItem, quantity: number) => {
    setBasketItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.dishItem.dish_id === dishItem.dish_id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.dishItem.dish_id === dishItem.dish_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { dishItem, quantity }];
      }
    });
  };

  useEffect(() => {
    dispatch(fetchRestaurant({ restaurantID: Number(restaurantId) }));
  }, [dispatch, restaurantId]);

  useEffect(() => {
    dispatch(fetchDishCategories({ restaurantID: Number(restaurantId) }));
  }, [dispatch, restaurantId]);

  const dishesState = useApi({
    endpoint: `/public/restaurants/${restaurantId}/dishes?limit=200`,
    isPublic: true,
    dependencies: [restaurantId],
  });

  const dishesLoading = dishesState.loading;
  const dishesError = dishesState.error;
  const dishItems: RestaurantDishItem[] =
    (dishesState.data?.dishes as RestaurantDishItem[]) ?? [];

  if (dishesError) {
    console.error("Error fetching dishes", dishesError);
    Swal.fire({
      title: "Error!",
      text: "An Error Occurred while fetching dishes",
      icon: "error",
    });
  }

  const reviewMetadataState = useApi({
    endpoint: `/public/restaurants/${restaurantId}/reviews-metadata`,
    isPublic: true,
    dependencies: [restaurantId],
  });

  const reviewMetadataLoading = reviewMetadataState.loading;
  const reviewMetadataError = reviewMetadataState.error;
  const reviewMetadata: ReviewsMetaData =
    (reviewMetadataState.data?.reviewsMetadata as ReviewsMetaData) ?? {};

  if (reviewMetadataError) {
    console.error("Error fetching review metadata", reviewMetadataError);
    Swal.fire({
      title: "Error!",
      text: "An Error Occurred while fetching review metadata",
      icon: "error",
    });
  }

  if (
    restaurantLoading ||
    dishCategoriesLoading ||
    dishesLoading ||
    reviewMetadataLoading
  ) {
    return <PageLoader />;
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
        {/* Restaurant page hero section */}
        <div className="w-full bg-white">
          <div className="mx-auto p-6">
            <button
              className="text-teal-500 flex items-center mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            <div className="w-full">
              <div className="flex flex-col w-full md:w-fit md:flex-row">
                <div className="grow w-full mb-4 md:mb-0">
                  <div className="relative w-full h-72 md:h-80">
                    <img
                      src={restaurant?.thumbnail_image_url}
                      alt={restaurant?.name + " thumbnail"}
                      className="rounded-lg w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="grow w-full md:ml-8">
                  <h1 className="text-2xl md:text-4xl font-bold mb-2">
                    {restaurant?.name}
                  </h1>
                  <p className="text-gray-600 mb-2">{restaurant?.tag_line}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    {/* Can render the open time using restaurant open time api */}
                    0.20 miles away · Opens at 11:00 · £7.00 minimum · £0.49
                    delivery
                  </p>
                  <div
                    className="py-3 mb-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsInfoModalOpen(true);
                    }}
                  >
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

                  <div
                    className="mb-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsReviewModalOpen(true);
                    }}
                  >
                    <button className="w-full flex justify-start items-center">
                      <div className="flex items-center">
                        <Star
                          fill="#4d7c1b"
                          strokeWidth={0}
                          className="h-6 w-6 mr-2"
                        />
                        <span className="text-[#4d7c1b]">
                          {reviewMetadata?.average_rating?.toFixed(1)} {"  "}
                          {reviewMetadata?.average_rating > 4.5
                            ? "Excellent"
                            : "Good"}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-teal-500 ml-24" />
                    </button>
                    <p className="text-sm text-gray-500 mt-1 ml-9">
                      See all {reviewMetadata?.review_count} reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-[69px] z-10">
          <CategoryNavbar dishCategories={dishCategories} />
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-10 ml-4">
            Popular with other People
          </h2>
          <FoodCarousel />
        </div>

        <div className="flex relative">
          <div className="grow">
            {dishCategories?.map((category) => (
              <div
                key={`section-${category.dish_category_id}`}
                id={`section-${category.dish_category_id}`}
                className="p-4 scroll-mt-[140px] mb-5"
              >
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
                        onAddToBasket={addToBasket}
                        calories={dish.calories}
                        dishItem={dish}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grow mt-8">
            <Basket restaurantId={restaurantId ?? ""} />
          </div>
        </div>
        {restaurant && (
          <RestaurantInfoModal
            isOpen={isInfoModalOpen}
            onClose={() => setIsInfoModalOpen(false)}
            info={restaurant}
          />
        )}
        {restaurant && // Lazy load review modal
          isReviewModalOpen && (
            <Suspense fallback={<PageLoader />}>
              <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                restaurantId={restaurant.restaurant_id}
              />
            </Suspense>
          )}
      </>
    </PageLayout>
  );
};
