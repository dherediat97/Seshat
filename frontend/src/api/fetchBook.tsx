import { Book } from '../types/types';
import { http } from './axios_instance';

export async function fetchBook(isbn: string): Promise<Book | undefined> {
  const response = await http.get(`/book/${isbn}`);

  if (response.status != 200) {
    return undefined;
  }
  const bookResponse = await response.data;

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
