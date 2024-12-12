import { Button } from '@mui/material';
import BookIcon from '@mui/icons-material/RestoreFromTrash';

type RestoreItems = {
  onRestore: () => void;
};

export default function RestoreItems({ onRestore }: RestoreItems) {
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: 'capitalize', padding: 4 }}
        onClick={(_) => onRestore()}
        startIcon={<BookIcon />}
      >
        Recuperar
      </Button>
    </>
  );
}
