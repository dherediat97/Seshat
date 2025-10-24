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
    <ListItem sx={{ padding: 8 }}>
      <Card>
        <CardActionArea href={!book.isLocalBook ? `/book/${book.isbn}` : ``}>
          <CardMedia
            component={'img'}
            sx={{
              width: 365,
              height: 500,
              margin: '0 auto',
              maxHeight: 600,
              objectFit: 'contain',
            }}
            image={book.imgSrc}
            title={book.title}
          />

          <CardContent>
            <Typography component="div" noWrap={true}>
              {book.title}
            </Typography>
            <Typography component="div" variant="caption" noWrap={true}>
              Autor: {book.authorName}
            </Typography>
            <Typography component="div" variant="caption" noWrap={true}>
              Editorial: {book.publisherName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
}
