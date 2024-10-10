import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface RestaurantDishItem {
  dish_id: number;
  restaurant_id: number;
  dish_category_id: number;
  thumbnail_image_url: string;
  dish_name: string;
  dish_description: string;
  calories: number;
  base_price: number;
  ingredients: string;
  isAvailable?: boolean;
}

interface RestaurantDishItemsResponse {
  status: string;
  dishes: RestaurantDishItem[];
}

interface RestaurantDishItemsState {
  dishes: RestaurantDishItem[];
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantDishItemsState = {
  dishes: [],
  loading: false,
  error: null,
};

export const fetchDishes = createAsyncThunk(
  "restaurants/fetchDishCategories",
  async ({ restaurantID }: { restaurantID: number }) => {
    const response = await axios.get<RestaurantDishItemsResponse>(
      `http://localhost:8080/api/public/restaurants/${restaurantID}/dishes?page=1&limit=999`
    );
    return response.data.dishes;
  }
);

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch restaurant dish items";
      });
  },
});

const dishesSliceReducer = dishesSlice.reducer;
export { dishesSliceReducer };
