import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  IconButton,
  ListItem,
  Typography,
} from '@mui/material';
import { Book } from '../types/types';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';

type BookItemProps = {
  book: Book;
  onActionBook: (book: Book, onActionBook: boolean) => void;
};

export default function BookItem({ book, onActionBook }: BookItemProps) {
  const navigate = useNavigate();

  const navigateDetailsBook = (book: Book) => {
    navigate(`/book/${book.isbn}`);
  };

  return (
    <ListItem sx={{ padding: 8, width: 600, marginRight: 8 }}>
      <Card>
        <CardMedia
          component={'img'}
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
            {book.title}
          </Typography>
          <Typography component="div" variant="caption" noWrap={true}>
            Autor: {book.authorName}
          </Typography>
          <Typography component="div" variant="caption" noWrap={true}>
            Editorial: {book.publisherName}
          </Typography>
        </CardContent>
        <CardActions>
          {!book.isDeleted ? (
            <>
              <IconButton onClick={() => onActionBook(book, false)}>
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <></>
          )}
          {!book.isLocalBook ? (
            <Grid2 container sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={() => navigateDetailsBook(book)}>
                Detalles
                <DetailsIcon />
              </Button>
            </Grid2>
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
    </ListItem>
  );
}
