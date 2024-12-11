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
    <ListItem sx={{ maxWidth: 400, paddingLeft: 8, paddingRight: 8 }}>
      <CardActionArea LinkComponent={'a'} href={`/book/${book.isbn}`}>
        <Card>
          <CardMedia
            component={'img'}
            sx={{
              height: 300,
              margin: '0 auto',
              minWidth: 200,
              maxHeight: 400,
              objectFit: 'scale-down',
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
