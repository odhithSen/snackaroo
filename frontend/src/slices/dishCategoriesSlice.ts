import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface RestaurantDishCategory {
  dish_category_id: number;
  restaurant_id: number;
  dish_category_name: string;
}

interface RestaurantDishCategoriesResponse {
  status: string;
  dishCategories: RestaurantDishCategory[];
}

interface RestaurantCategoriesState {
  dish_categories: RestaurantDishCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantCategoriesState = {
  dish_categories: [],
  loading: false,
  error: null,
};

export const fetchDishCategories = createAsyncThunk(
  "restaurants/fetchDishCategories",
  async ({ restaurantID }: { restaurantID: number }) => {
    const response = await axios.get<RestaurantDishCategoriesResponse>(
      `http://localhost:8080/api/public/restaurants/${restaurantID}/dish-categories`
    );
    return response.data.dishCategories;
  }
);

export const dishCategoriesSlice = createSlice({
  name: "dishCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.dish_categories = action.payload;
      })
      .addCase(fetchDishCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch restaurant dish categories";
      });
  },
});

const dishCategoriesSliceReducer = dishCategoriesSlice.reducer;
export { dishCategoriesSliceReducer };
