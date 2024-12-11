import { baseUrlAPI } from '../app/app_urls';
import { Review, ReviewResponse } from '../types/types';

export async function fetchBookReview(id: string): Promise<Review[]> {
  const response = await fetch(`${baseUrlAPI}/reviews/${id}`);

  if (!response.ok) throw new Error('Failed to fetch reviews');

  const reviewsResponse = (await response.json()) as ReviewResponse;

  const reviews: Review[] = reviewsResponse.reviews.map((review: any) => ({
    authorName: review.author_name,
    content: review.content,
    id: review.id,
    title: review.title,
  }));

  return reviews;
}
