import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Restaurant } from "./restaurantsSlice";

interface RestaurantResponse {
  status: string;
  restaurant: Restaurant;
}

interface RestaurantState {
  restaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  restaurant: null,
  loading: false,
  error: null,
};

export const fetchRestaurant = createAsyncThunk(
  "restaurants/fetchRestaurant",
  async ({ restaurantID }: { restaurantID: number }) => {
    const response = await axios.get<RestaurantResponse>(
      `http://localhost:8080/api/public/restaurants/${restaurantID}`
    );
    console.log("response.data" + response.data.restaurant);
    return response.data.restaurant;
  }
);

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload;
      })
      .addCase(fetchRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch restaurant";
      });
  },
});

const restaurantSliceReducer = restaurantSlice.reducer;
export { restaurantSliceReducer };
