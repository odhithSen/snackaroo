import { configureStore } from "@reduxjs/toolkit";
import { restaurantsSliceReducer } from "./slices/restaurantsSlice";
import { restaurantSliceReducer } from "./slices/restaurantSlice";
import { dishCategoriesSliceReducer } from "./slices/dishCategoriesSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantsSliceReducer,
    restaurant: restaurantSliceReducer,
    dishCategories: dishCategoriesSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
