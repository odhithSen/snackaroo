import { RestaurantDishItem } from "./restaurant-dish-item";

export interface BasketItem {
  dishItem: RestaurantDishItem;
  quantity: number;
}
