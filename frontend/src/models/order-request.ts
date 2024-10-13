export interface OrderRequest {
  restaurant_id: number;
  delivery_location: string;
  delivery_address_line1: string;
  delivery_address_line2: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  dish_id: number;
  quantity: number;
}
