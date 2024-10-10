import { configureStore } from "@reduxjs/toolkit";
import { restaurantsSliceReducer } from "./slices/restaurantsSlice";
import { restaurantSliceReducer } from "./slices/restaurantSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantsSliceReducer,
    restaurant: restaurantSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
