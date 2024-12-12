import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  ListItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { Book } from '../types/types';
import DeleteIcon from '@mui/icons-material/Delete';

type BookItemProps = {
  book: Book;
  onActionBook: (book: Book, onActionBook: boolean) => void;
};

export default function BookItem({ book, onActionBook }: BookItemProps) {
  return (
    <ListItem sx={{ padding: 16, marginRight: 8 }}>
      <Card>
        <CardActionArea href={!book.isLocalBook ? `/book/${book.isbn}` : ``}>
          <CardMedia
            component={'img'}
            sx={{
              width: 300,
              height: 400,
              margin: '0 auto',
              maxHeight: 600,
              objectFit: 'cover',
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
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {!book.isDeleted ? (
            <Tooltip title="Borrar libro de la memoria local">
              <IconButton onClick={() => onActionBook(book, false)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <></>
          )}
        </CardActions>
      </Card>
    </ListItem>
  );
}
