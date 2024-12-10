import { useEffect, useState } from 'react';
import { Book } from '../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import { fetchBook } from '../api/fetchBook';
import LoadingScreen from '../components/LoadingScreen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function BookDetail() {
  const [book, setBook] = useState<Book>();
  const [isLoading, setIsLoading] = useState(true);
  const { isbn } = useParams();
  const navigate = useNavigate();

  async function getBook() {
    setIsLoading(true);
    const fetchedBook = await fetchBook(isbn as string);
    setBook(fetchedBook);
    setIsLoading(false);
  }

  useEffect(() => {
    getBook();
  }, [isbn]);

  if (isLoading || !book) return <LoadingScreen />;

  return (
    <Container>
      <Button
        color="primary"
        onClick={(_) => {
          navigate(-1);
        }}
        startIcon={<ArrowBackIosNewIcon />}
      >
        Atrás
      </Button>
      <Typography
        component="div"
        variant="h4"
        noWrap={true}
        sx={{ textAlign: 'center', marginBottom: 16 }}
      >
        {book.title}
      </Typography>
      <Card sx={{ maxHeight: '1000px' }}>
        <CardMedia
          sx={{
            height: '500px',
            minHeight: '300px',
            maxHeight: '700px',
            objectFit: 'cover',
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
      <Typography
        component="div"
        variant="h4"
        noWrap={true}
        sx={{ textAlign: 'center', marginTop: 16 }}
      >
        Reseñas:
      </Typography>
    </Container>
  );
}
