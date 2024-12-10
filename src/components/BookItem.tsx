import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  ListItem,
  Typography,
} from '@mui/material';
import { Book } from '../types/types';

type BookItemProps = {
  book: Book;
};

export default function BookItem({ book }: BookItemProps) {
  return (
    <ListItem sx={{ marginBottom: 2, marginTop: 2 }}>
      <CardActionArea LinkComponent={'a'} href={`/book/${book.isbn}`}>
        <Card>
          <CardMedia
            sx={{
              maxHeight: 400,
              minHeight: 300,
              objectFit: 'container',
            }}
            image={book.imgSrc}
            title={book.title}
          />
          <CardContent>
            <Typography component="div" noWrap={true}>
              {book.title}
            </Typography>
            <Typography component="div" noWrap={true}>
              Autor: {book.authorName}
            </Typography>
            <Typography component="div" noWrap={true}>
              Editorial: {book.publisherName}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </ListItem>
  );
}
