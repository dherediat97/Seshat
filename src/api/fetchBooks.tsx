import { baseUrlAPI } from '../app/app_urls';
import { Book, BookListResponse } from '../types/types';

export async function fetchAllBooks(page: number): Promise<Book[]> {
  const response = await fetch(`${baseUrlAPI}/books?page=${page}`);

  if (!response.ok) throw new Error('Failed to fetch books');

  const booksResponse = (await response.json()) as BookListResponse;

  const books: Book[] = booksResponse.books.map((book: Book) => ({
    id: book.id,
    isbn: book.isbn,
    authorName: book.authorName,
    title: book.title,
    publisherName: book.publisherName,
    pages: book.pages,
  }));

  return books;
}
