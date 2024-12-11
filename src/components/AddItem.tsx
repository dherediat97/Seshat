import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

import BookIcon from '@mui/icons-material/Add';
import { FormEvent, useState } from 'react';
import { Book } from '../types/types';
import { LOCAL_BOOKS_KEY } from '../app/app_constants';

type AddItemProps = {
  onAddItem: (bookAdded: Book) => void;
};

export default function AddItem({ onAddItem }: AddItemProps) {
  const [open, setOpen] = useState(false);

  const openCreateBookDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formDataJson = Object.fromEntries(
              (formData as any).entries()
            );
            const title = formDataJson.title;
            const isbn = formDataJson.isbn;
            const imgBook = formDataJson.img_book;
            const authorName = formDataJson.author_name;
            const publisherName = formDataJson.publisher_name;
            const numPages = formDataJson.num_pages;
            const book: Book = {
              id: (Math.random() * 50).toFixed(0),
              title: title,
              isbn: isbn,
              authorName: authorName,
              publisherName: publisherName,
              imgSrc: imgBook,
              pages: numPages,
              isLocalBook: true,
              isDeleted: false,
            };
            const localBooks: Book[] = JSON.parse(
              localStorage.getItem(LOCAL_BOOKS_KEY)! ?? []
            );
            localBooks.push(book);
            localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(localBooks));
            onAddItem(book);
            handleClose();
          },
        }}
      >
        <DialogTitle>Creación de un libro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para crear un libro tienes que rellenar lo siguiente:
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Título"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="isbn"
            name="isbn"
            label="ISBN"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="author_name"
            name="author_name"
            label="Autor"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="publisher_name"
            name="publisher_name"
            label="Editorial"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="num_pages"
            name="num_pages"
            label="Numero de páginas"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="img_book"
            name="img_book"
            label="Imagen"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Crear libro</Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: 'capitalize', padding: 4 }}
        onClick={(_e) => openCreateBookDialog()}
        startIcon={<BookIcon />}
      >
        Añadir Libro
      </Button>
    </>
  );
}
