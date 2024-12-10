import { baseUrlAPI } from '../app/app_urls';
import { Review, ReviewResponse } from '../types/types';

export async function fetchAllReviews(): Promise<Review[]> {
  const response = await fetch(`${baseUrlAPI}/reviews`);

  if (!response.ok) throw new Error('Failed to fetch reviews');

  const reviewResponse = (await response.json()) as ReviewResponse;

  const reviews: Review[] = reviewResponse.reviews.map((review: Review) => ({
    id: review.id,
    authorName: review.authorName,
    content: review.content,
    title: review.title,
  }));

  return reviews;
}
