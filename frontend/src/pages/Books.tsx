import { Box, Grid2, Snackbar, Stack, Typography } from '@mui/material';
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

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isBookCreated, setIsBookCreated] = useState(false);

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
    if (bookResponse?.booksFound) {
      setBooks(bookResponse.booksFound);
    }
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(books));
    setIsLoading(false);
  };

  const onAddBook = (bookAdded: Book) => {
    books.push(bookAdded);
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(books));
    fetchBooks();
    setIsBookCreated(true);
  };

  const onRestoreAll = async () => {
    setIsLoading(true);
    const bookResponse = await fetchAllBooks(1);
    if (bookResponse) {
      setBooks(bookResponse.books);
      setPage(1);
    }
    setIsLoading(false);
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(bookResponse?.books));
  };

  const onActionBook = (bookToDelete: Book) => {
    var bookNotDeleted: Book[] = books.filter(
      (book) => book.isbn !== bookToDelete.isbn
    );
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(bookNotDeleted));

    setBooks(JSON.parse(localStorage.getItem(LOCAL_BOOKS_KEY)!));
  };

  //Infinite Scrolling
  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (query == '') onRestoreAll();
      if (query.length > 3) searchBooks();
    }, 750);
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

  return (
    <>
      <Snackbar
        open={isBookCreated}
        autoHideDuration={6000}
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
      {!books ? (
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
          <Grid2
            container
            direction={'row'}
            rowSpacing={8}
            columnSpacing={8}
            sx={{
              overflowX: 'hidden',
              flexWrap: 'wrap',
              display: 'flex',
            }}
          >
            {books.map((book, index) => (
              <Grid2 key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                <BookItem book={book} onActionBook={() => onActionBook(book)} />
              </Grid2>
            ))}
          </Grid2>
        </>
      )}
      {isLoading && page < totalPages ? <LoadingScreen /> : null}
    </>
  );
}
