export type SentimentLabel = "Tốt" | "Trung bình" | "Dở";

export interface ReviewItem {
  id: string;
  author: string;
  time: string;
  rating: number;
  comment: string;
}

export interface PeakHourItem {
  hour: string;
  value: number;
}

export interface SentimentPieItem {
  name: SentimentLabel;
  value: number;
}

export interface SentimentTimelineItem {
  period: string;
  tot: number;
  trungBinh: number;
  do: number;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  priceLevel: string;
  averagePrice: number;
  rating: number;
  address: string;
  phone: string;
  openingStatus: string;
  image: string;
  tags: string[];
  lgbtFriendly: boolean;
  reviews: ReviewItem[];
  peakHours: PeakHourItem[];
  sentimentSummary: SentimentPieItem[];
  sentimentTimeline: SentimentTimelineItem[];
}