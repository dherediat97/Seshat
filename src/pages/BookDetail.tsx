import { useEffect, useState } from 'react';
import { Book, Review } from '../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from '@mui/material';
import { fetchBook } from '../api/fetchBook';
import LoadingScreen from '../components/LoadingScreen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ReviewList from './Reviews';
import { fetchBookReview } from '../api/fetchBookReviews';

export default function BookDetail() {
  var [book, setBook] = useState<Book>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bookId, setBookId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const { isbn } = useParams();
  const navigate = useNavigate();

  async function getBook() {
    setIsLoading(true);
    const fetchedBook = await fetchBook(isbn as string);
    if (fetchedBook) {
      setBookId(fetchedBook.id);
      setBook(fetchedBook);
    } else {
      const localBook = fetchLocalBook();
      setBookId(localBook.id);
      setBook(localBook);
    }

    setIsLoading(false);
  }

  function fetchLocalBook(): Book {
    const localBooks: Book[] = JSON.parse(localStorage.getItem('localBooks')!);
    const localBook: Book = localBooks.find((book) => book.isbn == isbn)!;
    return localBook;
  }

  async function getReviews() {
    setIsLoadingReviews(true);
    const fetchedReviews = await fetchBookReview(bookId as string);
    setReviews(fetchedReviews);
    setIsLoadingReviews(false);
  }

  useEffect(() => {
    getBook();
  }, [isbn]);

  useEffect(() => {
    if (bookId) getReviews();
  }, [bookId]);

  if (isLoading) return <LoadingScreen />;

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      marginRight={8}
      marginLeft={8}
    >
      <Button
        color="primary"
        onClick={(_) => {
          navigate(-1);
        }}
        startIcon={<ArrowBackIosNewIcon />}
      >
        Atrás
      </Button>
      {!book ? (
        <Box
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
          display={'flex'}
        >
          <Typography variant="h4">
            No se ha podido recuperar el libro seleccionado
          </Typography>
        </Box>
      ) : (
        <>
          <Typography
            component="div"
            variant="h6"
            noWrap={true}
            sx={{ marginBottom: 8, marginTop: 8 }}
          >
            {book.title}
          </Typography>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Card>
                <CardMedia
                  sx={{
                    width: 300,
                    height: 400,
                    margin: '0 auto',
                    maxHeight: 600,
                    objectFit: 'scale-down',
                  }}
                  image={book.imgSrc}
                  title={book.title}
                />
                <CardContent>
                  <Typography component="div" noWrap={true}>
                    ISBN: {book.isbn}
                  </Typography>
                  <Typography component="div" noWrap={true}>
                    Autor: {book.authorName}
                  </Typography>
                  <Typography component="div" noWrap={true}>
                    Editorial: {book.publisherName}
                  </Typography>
                  <Typography component="div" noWrap={true}>
                    Número de páginas: {book.pages}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              {isLoadingReviews ? (
                <LoadingScreen />
              ) : reviews.length > 0 ? (
                <>
                  <Typography
                    component="div"
                    variant="h5"
                    noWrap={true}
                    sx={{ marginTop: 16, marginLeft: 8 }}
                  >
                    Reseñas:
                  </Typography>
                  <ReviewList reviews={reviews} />
                </>
              ) : (
                <Typography
                  variant="h5"
                  sx={{ width: '100%', height: '100%', textAlign: 'center' }}
                  component={'div'}
                >
                  No hay reseñas
                </Typography>
              )}
            </Grid2>
          </Grid2>
        </>
      )}
    </Box>
  );
}
