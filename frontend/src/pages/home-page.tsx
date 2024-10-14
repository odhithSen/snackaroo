import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurants } from "src/slices/restaurantsSlice";
import { RootState, AppDispatch } from "../store";
import { PageLayout } from "../components/page-layout";
import RestaurantCard from "src/components/cards/restaurant-card";

export const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { restaurants, loading, error } = useSelector(
    (state: RootState) => state.restaurants
  );

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <PageLayout>
      <>
        <div className="flex justify-center mx-5">
          <div className="flex flex-wrap justify-center gap-5 mt-16">
            {restaurants.map((restaurant) => (
              <a href={`/restaurant/${restaurant.restaurant_id}`}>
                <RestaurantCard
                  key={restaurant.restaurant_id}
                  name={restaurant.name}
                  imageUrl={restaurant.thumbnail_image_url}
                  rating={restaurant.hygiene_rating}
                />
              </a>
            ))}
          </div>
        </div>
      </>
    </PageLayout>
  );
};
