import { IconButton, Tooltip } from '@mui/material';
import RestoreBooksIcon from '@mui/icons-material/CloudDownload';

type RestoreItems = {
  onRestore: () => void;
};

export default function RestoreItems({ onRestore }: RestoreItems) {
  return (
    <Tooltip title="Restaurar libros borrados localmente">
      <IconButton
        color="primary"
        sx={{ padding: 4 }}
        onClick={(_) => onRestore()}
      >
        <RestoreBooksIcon />
      </IconButton>
    </Tooltip>
  );
}
