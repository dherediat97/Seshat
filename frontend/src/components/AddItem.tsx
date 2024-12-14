import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';

import BookIcon from '@mui/icons-material/Add';
import React, { FormEvent, useState } from 'react';
import { Book } from '../types/types';
import { LOCAL_BOOKS_KEY } from '../app/app_constants';

type AddItemProps = {
  onAddItem: (bookAdded: Book) => void;
};

export default function AddItem({ onAddItem }: AddItemProps) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [publisherName, setPublisherName] = useState('');
  const [numPages, setNumPages] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [isbnError, setIsbnError] = useState(false);
  const [authorNameError, setAuthorNameError] = useState(false);
  const [publisherNameError, setPublisherNameError] = useState(false);
  const [numPagesError, setNumPagesError] = useState(false);
  const [imgUrlError, setImgUrlError] = useState(false);

  const openCreateBookDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitle('');
    setIsbn('');
    setAuthorName('');
    setPublisherName('');
    setNumPages('');
    setImgUrl('');
    setTitleError(false);
    setIsbnError(false);
    setAuthorNameError(false);
    setPublisherNameError(false);
    setNumPagesError(false);
    setImgUrlError(false);
    setOpen(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const localBooks: Book[] = JSON.parse(
      localStorage.getItem(LOCAL_BOOKS_KEY)! ?? []
    );

    const formData = new FormData(event.currentTarget);
    const formDataJson = Object.fromEntries((formData as any).entries());
    const title = formDataJson.title;
    const isbn = formDataJson.isbn;
    const authorName = formDataJson.author_name;
    const publisherName = formDataJson.publisher_name;
    const numPages = formDataJson.num_pages;
    const imgBook = formDataJson.img_book;
    const book: Book = {
      title: title,
      isbn: isbn,
      authorName: authorName,
      publisherName: publisherName,
      imgSrc: imgBook,
      pages: numPages,
      isLocalBook: true,
      isDeleted: false,
    };

    localBooks.push(book);
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(localBooks));
    onAddItem(book);
    handleClose();
  };

  const validateTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
    if (e.target.validity.valid) {
      setTitleError(false);
    } else {
      setTitleError(true);
    }
  };

  const validateIsbn = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsbn(e.target.value);
    if (e.target.validity.valid) {
      setIsbnError(false);
    } else {
      setIsbnError(true);
    }
  };

  const validateAuthorName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAuthorName(e.target.value);
    if (e.target.validity.valid) {
      setAuthorNameError(false);
    } else {
      setAuthorNameError(true);
    }
  };

  const validatePublisherName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPublisherName(e.target.value);
    if (e.target.validity.valid) {
      setPublisherNameError(false);
    } else {
      setPublisherNameError(true);
    }
  };

  const validateNumPages = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNumPages(e.target.value);
    if (e.target.validity.valid) {
      setNumPagesError(false);
    } else {
      setNumPagesError(true);
    }
  };

  const validateImgUrl = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setImgUrl(e.target.value);
    if (e.target.validity.valid) {
      setImgUrlError(false);
    } else {
      setImgUrlError(true);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: FormEvent<HTMLFormElement>) => onSubmit(event),
        }}
      >
        <DialogTitle>Creación de un libro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para crear un libro tienes que rellenar lo siguiente:
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="title"
            name="title"
            label="Título"
            type="text"
            helperText={titleError ? 'Título del libro inválido' : ''}
            value={title}
            error={titleError}
            onChange={(event) => validateTitle(event)}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            slotProps={{
              htmlInput: {
                maxLength: 13,
                minLength: 13,
                pattern: '[0-9]{13}',
              },
            }}
            helperText={isbnError ? 'Isbn inválido' : ''}
            value={isbn}
            error={isbnError}
            onChange={(event) => validateIsbn(event)}
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
            helperText={authorNameError ? 'Nombre de autor inválido' : ''}
            value={authorName}
            error={authorNameError}
            onChange={(event) => validateAuthorName(event)}
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
            helperText={
              publisherNameError ? 'Nombre de la editorial inválida' : ''
            }
            value={publisherName}
            error={publisherNameError}
            onChange={(event) => validatePublisherName(event)}
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
            helperText={numPagesError ? 'Número de páginas inválido' : ''}
            value={numPages}
            error={numPagesError}
            onChange={(event) => validateNumPages(event)}
            label="Numero de páginas"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="img_book"
            name="img_book"
            label="Imagen"
            helperText={imgUrlError ? 'URL Imagen Inválida' : ''}
            value={imgUrl}
            error={imgUrlError}
            onChange={(event) => validateImgUrl(event)}
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
      <Tooltip title="Añadir libros localmente">
        <IconButton
          color="primary"
          sx={{ padding: 4 }}
          onClick={(_e) => openCreateBookDialog()}
        >
          <BookIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
