import { Box, TextField } from '@mui/material';

type SearchbarProps = {
  query: string;
  setQuery: (query: string) => void;
};

export default function Searchbar({ query, setQuery }: SearchbarProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginBottom={16}
      marginTop={16}
    >
      <TextField
        placeholder="Busca por título..."
        sx={{ width: '380px' }}
        value={query}
        onChange={(event) => setQuery(event?.target.value)}
      />
    </Box>
  );
}
