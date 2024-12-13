import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ routeName }: { routeName: any }) {
  const navigate = useNavigate();

  return (
    <Button
      color="primary"
      onClick={(_) => {
        navigate(routeName);
      }}
      startIcon={<ArrowBackIosNewIcon />}
    >
      Atrás
    </Button>
  );
}
