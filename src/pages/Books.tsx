import { Container, Grid2, Snackbar, SnackbarCloseReason } from '@mui/material';
import { useEffect, useState } from 'react';
import { Book } from '../types/types';
import { fetchAllBooks } from '../api/fetchBooks';
import Searchbar from '../components/Searchbar';
import BookItem from '../components/BookItem';
import LoadingScreen from '../components/LoadingScreen';

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  var [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    const bookResponse = await fetchAllBooks(page);
    setBooks([...books, ...bookResponse]);
    setPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  };

  //Infinite Scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  //Search Books
  const filterBooks = books.filter((book) => {
    return book.title.toLowerCase().match(query.toLowerCase());
  });

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };

  //LoadingBox
  if (isLoading || !books) return <LoadingScreen />;

  return (
    <Container>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        message="No hay libros registrados"
      />
      <Searchbar query={query} setQuery={setQuery} />
      <Grid2 rowSpacing={2} columnSpacing={2} container sx={{ width: '100%' }}>
        {filterBooks.map((book) => (
          <Grid2 key={book.id} size={{ xs: 2, sm: 5, md: 3 }}>
            <BookItem book={book} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
