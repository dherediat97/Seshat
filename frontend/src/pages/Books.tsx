import {
  Box,
  Grid,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Book } from '../types/types';
import { fetchAllBooks } from '../api/fetchBooks';
import Searchbar from '../components/Searchbar';
import BookItem from '../components/BookItem';
import LoadingScreen from '../components/LoadingScreen';
import debounce from '../utils/scroll_utils';
import { fetchSearchBooks } from '../api/fetchSearchBooks';
import theme from '../theme';
import SearchNotFoundPage from './SearchNotFound';

const TRESHOLD_INFINITE_SCROLL = 0.85;

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const hasBeenReendered = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSnackbarShown, setSnackBarShown] = useState(false);
  const [emptyLibrary, setEmptyLibrary] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const fetchBooks = async () => {
    const bookResponse = await fetchAllBooks(page);
    if (bookResponse) {
      setTotalPages(bookResponse.info.totalPages);
      const newBooks = [...books, ...bookResponse.books];
      setBooks(newBooks);
    } else {
      setEmptyLibrary(true);
    }
    setIsLoading(false);
  };

  const searchBooks = async () => {
    if (query === "") fetchBooks();

    const bookResponse = await fetchSearchBooks(encodeURI(query));
    if (bookResponse?.booksFound.length) {
      setSearchError(false);
      setBooks(bookResponse.booksFound);
    } else {
      setSearchError(true);
      setEmptyLibrary(true);
    }
    setIsLoading(false);
  };



  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarShown(false);
  };

  //Infinite Scrolling
  const handleScroll = () => {
    if (
      document.body.scrollHeight * TRESHOLD_INFINITE_SCROLL <
      window.scrollY + window.innerHeight &&
      query == ''
    ) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (isLoading && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    if (hasBeenReendered.current) debounce(searchBooks(), 400);
    hasBeenReendered.current = true;
  }, [query]);

  useEffect(() => {
    fetchBooks();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 100));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Snackbar
        onClose={handleClose}
        open={isSnackbarShown}
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
            <Grid
              container
              direction={isMobile ? 'column' : 'row'}
              justifyContent={isMobile ? 'center' : 'flex-start'}
              alignItems="center"
              rowSpacing={8}
              columnSpacing={8}
            >
              {books.map((book, index) => (
                <Grid key={index}>
                  <BookItem book={book} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      {isLoading && page < totalPages ? <LoadingScreen /> : null}
    </>
  );
}
