import { useEffect, useState } from 'react';
import { Book } from '../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
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
    <>
      <Container>
        <Button
          component="label"
          role={undefined}
          onClick={(_) => {
            navigate(-1);
          }}
          variant="contained"
          startIcon={<ArrowBackIosNewIcon />}
        ></Button>
        <Typography>{book.title}</Typography>
      </Container>
    </>
  );
}
