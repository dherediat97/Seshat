import { Typography } from '@mui/material';

export default function SearchNotFoundPage() {
  return (
    <>
      <img
        src="/assets/search_not_found.svg"
        style={{
          display: 'block',
          width: 360,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
      <Typography textAlign={'center'} variant="h5">
        No hay resultados para dicha búsqueda
      </Typography>
    </>
  );
}
