import { Book, BookSearchResponse } from '../types/types';
import { http } from './axios_instance';

export async function fetchSearchBooks(
  filter: string
): Promise<BookSearchResponse | undefined> {
  try {
    const response = await http.get(`books/search/${filter}`, {
      paramsSerializer: (params) => {
        // Sample implementation of query string building
        let result = '';
        Object.keys(params).forEach((key) => {
          result += `${key}=${encodeURIComponent(params[key])}&`;
        });
        return result.substring(0, result.length - 1);
      },
    });
    if (response.status != 200) {
      return undefined;
    }

    const booksResponse = (await response.data) as BookSearchResponse;

    const books: Book[] = booksResponse.booksFound.map((book: any) => ({
      id: book.id,
      isbn: book.isbn,
      authorName: book.author_name,
      imgSrc: book.img_url,
      title: book.title,
      publisherName: book.publisher_name,
      pages: book.num_pages,
      isLocalBook: false,
      isDeleted: false,
    }));

    booksResponse.booksFound = books.filter(
      (book: any, index: number) =>
        books.findIndex((other: any) => other.id === book.id) === index
    );

    return booksResponse;
  } catch (error) {
    console.error(error);
  }
}
