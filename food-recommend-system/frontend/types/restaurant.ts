export interface ReviewItem {
  _id?: string;
  id?: string;
  restaurant_id: string;
  restaurant_name?: string;
  reviewer?: string;
  rating?: number | null;
  days_ago?: number | null;
  comment?: string;
  comment_clean?: string;
  food_rating?: number | null;
  service_rating?: number | null;
  atmosphere_rating?: number | null;
  sentiment?: number | null;
}

export interface Restaurant {
  _id?: string;
  id?: string;
  restaurant_id: string;
  name?: string;
  restaurant_name?: string;
  category?: string;
  category_clean?: string;
  rating?: number;
  avg_rating?: string;
  review_count?: number | string;
  address?: string;
  phone?: string;
  canonical_url?: string;
  url?: string;
  lgbtq_friendly?: string;
  opening_hours?: Record<string, string>;
  opening_parsed?: Record<string, number[][]>;
  popular_parsed?: Record<string, Record<string, number>>;
  about_clean?: Record<string, string[]>;
  price_min?: number | string;
  price_max?: number | string;
  price_level?: string;
  reviews?: ReviewItem[];
}