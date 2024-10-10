import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Restaurant {
  restaurant_id: number;
  name: string;
  thumbnail_image_url: string;
  tag_line: string;
  location: string;
  address: string;
  contact_number?: string;
  hygiene_rating?: number;
  notes: string;
}

interface RestaurantsResponse {
  status: string;
  restaurants: Restaurant[];
}

interface RestaurantsState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantsState = {
  restaurants: [],
  loading: false,
  error: null,
};

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async () => {
    const response = await axios.get<RestaurantsResponse>(
      "http://localhost:8080/api/public/restaurants?page=1&limit=10"
    );
    console.log("response.data" + response.data.restaurants);
    return response.data.restaurants;
  }
);

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch restaurants";
      });
  },
});

const restaurantsSliceReducer = restaurantsSlice.reducer;
export { restaurantsSliceReducer };
