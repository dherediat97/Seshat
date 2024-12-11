import { baseUrlAPI } from '../app/app_urls';
import { Review, ReviewResponse } from '../types/types';
import { http } from './axios_instance';

export async function fetchAllReviews(): Promise<Review[]> {
  const response = await http.get(`${baseUrlAPI}/reviews`);

  if (response.status != 200) {
    return [];
  }

  const reviewResponse = (await response.data) as ReviewResponse;

  const reviews: Review[] = reviewResponse.reviews.map((review: Review) => ({
    id: review.id,
    authorName: review.authorName,
    content: review.content,
    title: review.title,
  }));

  return reviews;
}
