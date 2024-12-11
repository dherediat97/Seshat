import { baseUrlAPI } from '../app/app_urls';
import { Book } from '../types/types';

export async function fetchBook(isbn: string): Promise<Book | undefined> {
  const response = await fetch(`${baseUrlAPI}/book/${isbn}`);

  if (!response.ok) {
    return undefined;
  }
  const bookResponse = await response.json();

  const book: Book = {
    id: bookResponse.id,
    isbn: bookResponse.isbn,
    authorName: bookResponse.author_name,
    imgSrc: bookResponse.img_url,
    title: bookResponse.title,
    publisherName: bookResponse.publisher_name,
    pages: bookResponse.num_pages,
    isLocalBook: false,
    isDeleted: false,
  };

  return book;
}
