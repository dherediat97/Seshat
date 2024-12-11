import { baseUrlAPI } from '../app/app_urls';
import { Book, BookListResponse } from '../types/types';

export async function fetchAllBooks(
  page: number
): Promise<BookListResponse | undefined> {
  const response = await fetch(`${baseUrlAPI}/books?page=${page}`);

  if (!response.ok) {
    return undefined;
  }

  const booksResponse = (await response.json()) as BookListResponse;

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
}
