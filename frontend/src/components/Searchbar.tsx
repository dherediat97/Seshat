import { Box, TextField, Tooltip } from '@mui/material';

type SearchbarProps = {
  query: string;
  setQuery: (query: string) => void;
};

export default function Searchbar({ query, setQuery }: SearchbarProps) {
  return (
    <Box
      marginBottom={16}
      marginTop={16}
      alignContent={'center'}
      alignItems={'center'}
      sx={{ width: '100%' }}
    >
      <Tooltip title="Puedes buscar por título, nombre de autor o nombre de la editorial">
        <TextField
          placeholder="Busca aqui..."
          fullWidth
          value={query}
          onChange={(event) => setQuery(event?.target.value)}
        />
      </Tooltip>
    </Box>
  );
}
