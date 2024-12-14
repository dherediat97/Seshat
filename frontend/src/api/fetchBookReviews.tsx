import { Review, ReviewResponse } from '../types/types';
import { http } from './axios_instance';

export async function fetchBookReview(id: number): Promise<Review[]> {
  const response = await http.get(`/reviews/${id}`);

  if (response.status != 200) throw new Error('Failed to fetch reviews');

  const reviewsResponse = (await response.data) as ReviewResponse;

  const reviews: Review[] = reviewsResponse.reviews.map((review: any) => ({
    authorName: review.author_name,
    content: review.content,
    id: review.id,
    title: review.title,
  }));

  return reviews;
}
