export interface RestaurantReview {
  id: string;
  rating: number;
  date: string;
  description: string;
  tags?: string[];
  user: {
    user_id: number;
    first_name: string;
    last_name: string;
    profile_picture_url?: string;
  };
}

export interface ReviewsMetaData {
  review_count: number;
  average_rating: number;
}
