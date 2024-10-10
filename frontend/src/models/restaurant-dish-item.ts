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
