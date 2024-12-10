import { Container, List } from '@mui/material';
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

  const fetchBooks = async () => {
    setIsLoading(true);
    const bookResponse = await fetchAllBooks(page);
    setBooks([...books, ...bookResponse]);
    setPage(page++);
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
    fetchAllBooks(page);
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

  //LoadingBox
  if (isLoading || !books) return <LoadingScreen />;

  return (
    <Container>
      <Searchbar query={query} setQuery={setQuery} />
      <List>
        {filterBooks.map((book) => (
          <BookItem book={book} key={book.id} />
        ))}
      </List>
    </Container>
  );
}
