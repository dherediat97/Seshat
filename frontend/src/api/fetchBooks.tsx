import { Book, BookListResponse } from '../types/types';
import { http } from './axios_instance';

export async function fetchAllBooks(
  page: number
): Promise<BookListResponse | undefined> {
  try {
    const response = await http.get(`/books?page=${page}`);
    if (response.status != 200) {
      return undefined;
    }

    const booksResponse = (await response.data) as BookListResponse;

    const books: Book[] = booksResponse.books.map((book: any) => ({
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

    booksResponse.books = books.filter(
      (book: any, index: number) =>
        books.findIndex((other: any) => other.id === book.id) === index
    );

    return booksResponse;
  } catch (error) {
    console.error(error);
  }
}
