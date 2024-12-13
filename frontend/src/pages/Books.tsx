import {
  Box,
  Grid2,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Book } from '../types/types';
import { fetchAllBooks } from '../api/fetchBooks';
import Searchbar from '../components/Searchbar';
import BookItem from '../components/BookItem';
import LoadingScreen from '../components/LoadingScreen';
import AddItem from '../components/AddItem';
import { LOCAL_BOOKS_KEY } from '../app/app_constants';
import RestoreItems from '../components/RestoreItems';
import debounce from '../utils/scroll_utils';
import { fetchSearchBooks } from '../api/fetchSearchBooks';
import theme from '../theme';
import SearchNotFoundPage from './SearchNotFound';

const TRESHOLD_INFINITE_SCROLL = 0.85;

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isBookCreated, setIsBookCreated] = useState(false);
  const [emptyLibrary, setEmptyLibrary] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const fetchBooks = async () => {
    setIsLoading(true);
    const bookResponse = await fetchAllBooks(page);
    if (bookResponse) {
      setTotalPages(bookResponse.info.totalPages);
      setBooks([...books, ...bookResponse.books]);
    }
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(books));
    setIsLoading(false);
  };

  const searchBooks = async () => {
    setIsLoading(true);
    const bookResponse = await fetchSearchBooks(encodeURI(query));
    if (bookResponse?.booksFound.length) {
      setSearchError(false);
      setBooks(bookResponse.booksFound);
    } else {
      setSearchError(true);
    }
    setIsLoading(false);
  };

  const onAddBook = (bookAdded: Book) => {
    books.push(bookAdded);
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(books));
    fetchBooks();
    setIsBookCreated(true);
    setEmptyLibrary(false);
  };

  const onRestoreAll = async () => {
    setIsLoading(true);
    setSearchError(false);
    const bookResponse = await fetchAllBooks(1);
    if (bookResponse) {
      setBooks(bookResponse.books);
      setPage(1);
    }
    setIsLoading(false);
    setEmptyLibrary(false);
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(bookResponse?.books));
  };

  const onDeleteBook = (bookToDelete: Book) => {
    var bookNotDeleted: Book[] = books.filter(
      (book) => book.isbn !== bookToDelete.isbn
    );
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(bookNotDeleted));

    setBooks(JSON.parse(localStorage.getItem(LOCAL_BOOKS_KEY)!));
    if (bookNotDeleted.length == 0) setEmptyLibrary(true);
  };

  //Infinite Scrolling
  const handleScroll = () => {
    if (
      document.body.scrollHeight * TRESHOLD_INFINITE_SCROLL <
      window.scrollY + window.innerHeight
    ) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (query == '') onRestoreAll();
    else if (query.length > 3) debounce(searchBooks(), 400);
  }, [query]);

  useEffect(() => {
    fetchBooks();
  }, [page]);

  useEffect(() => {
    if (isLoading && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 100));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //Prevent duplicates books
  const uniqueBooks = books.filter(
    (book: any, index: number) =>
      books.findIndex((other: any) => other.id === book.id) === index
  );

  return (
    <>
      <Snackbar
        open={isBookCreated}
        autoHideDuration={5000}
        message="Libro creado correctamente"
      />
      <Stack
        direction="row"
        sx={{
          width: '100%',
          marginTop: 8,
          marginBottom: 8,
          marginRight: 8,
          marginLeft: 8,
        }}
        spacing={8}
      >
        <Searchbar query={query} setQuery={setQuery} />
        <AddItem onAddItem={(book) => onAddBook(book)} />
        <RestoreItems onRestore={() => onRestoreAll()} />
      </Stack>
      {emptyLibrary ? (
        <Box
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
          display={'flex'}
        >
          <Typography variant="h4">No hay libros registrados</Typography>
        </Box>
      ) : (
        <>
          {searchError ? (
            <SearchNotFoundPage />
          ) : (
            <Grid2
              container
              direction={isMobile ? 'column' : 'row'}
              justifyContent={isMobile ? 'center' : 'flex-start'}
              alignItems="center"
              rowSpacing={8}
              columnSpacing={8}
            >
              {uniqueBooks.map((book, index) => (
                <Grid2 key={index}>
                  <BookItem
                    book={book}
                    onDeleteBook={() => onDeleteBook(book)}
                  />
                </Grid2>
              ))}
            </Grid2>
          )}
        </>
      )}
      {isLoading && page < totalPages ? <LoadingScreen /> : null}
    </>
  );
}
