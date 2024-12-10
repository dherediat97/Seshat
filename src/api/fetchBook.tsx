import { baseUrlAPI } from '../app/app_urls';
import { Book } from '../types/types';

export async function fetchBook(isbn: string): Promise<Book> {
  const response = await fetch(`${baseUrlAPI}/book/${isbn}`);

  if (!response.ok) throw new Error('Failed to fetch books');

  const bookResponse = await response.json();

  return bookResponse;
}
