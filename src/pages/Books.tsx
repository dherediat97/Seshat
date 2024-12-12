import { Box, Grid2, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Book } from '../types/types';
import { fetchAllBooks } from '../api/fetchBooks';
import Searchbar from '../components/Searchbar';
import BookItem from '../components/BookItem';
import LoadingScreen from '../components/LoadingScreen';
import AddItem from '../components/AddItem';
import { LOCAL_BOOKS_KEY } from '../app/app_constants';
import RestoreItems from '../components/RestoreItems';

export default function BookList() {
  const [books, setBooks] = useState<Book[]>(() => {
    return JSON.parse(localStorage.getItem(LOCAL_BOOKS_KEY)!) || [];
  });
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  var [page, setPage] = useState(1);

  const fetchBooks = async () => {
    setIsLoading(true);
    const bookResponse = await fetchAllBooks(page);
    if (bookResponse) {
      setBooks([...books, ...bookResponse.books]);
      setPage((prevPage) => prevPage + 1);
    }
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(filterBooks));
    setIsLoading(false);
  };

  const onAddBook = (bookAdded: Book) => {
    books.push(bookAdded);
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(books));
    fetchBooks();
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
  const filterBooks = books.filter((book, index) => {
    return (
      books.findIndex((other: any) => other.id === book.id) === index &&
      book.title.toLowerCase().match(query.toLowerCase())
    );
  });

  //LoadingBox
  if (isLoading) return <LoadingScreen />;

  return (
    <>
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
      {books.length == 0 ? (
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
            {filterBooks.map((book, index) => (
              <Grid2 key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                <BookItem book={book} onActionBook={() => onActionBook(book)} />
              </Grid2>
            ))}
          </Grid2>
        </>
      )}
    </>
  );
}
