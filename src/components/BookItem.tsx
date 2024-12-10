import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  ListItem,
  Typography,
} from '@mui/material';
import { Book } from '../types/types';
import { baseUrlImage } from '../app/app_urls';

type BookItemProps = {
  book: Book;
};

export default function BookItem({ book }: BookItemProps) {
  return (
    <Container>
      <ListItem>
        <CardActionArea LinkComponent={'a'} href={`/books/${book.isbn}`}>
          <Card elevation={10}>
            <CardMedia
              sx={{ height: 200, width: 100 }}
              image={`${baseUrlImage}/06/${book.isbn}.webp`}
              title={book.title}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {book.title}
              </Typography>
              <Typography variant="h5" component="div">
                {book.authorName}
              </Typography>
              <Typography variant="h5" component="div">
                {book.publisherName}
              </Typography>
              <Typography variant="h5" component="div">
                {book.pages}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver reseñas</Button>
            </CardActions>
          </Card>
        </CardActionArea>
      </ListItem>
    </Container>
  );
}
