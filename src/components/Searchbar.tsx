import { Container, TextField } from '@mui/material';

type SearchbarProps = {
  query: string;
  setQuery: (query: string) => void;
};

export default function Searchbar({ query, setQuery }: SearchbarProps) {
  return (
    <Container sx={{ width: '100%' }}>
      <TextField
        placeholder="Busca por título..."
        value={query}
        onChange={(event) => setQuery(event?.target.value)}
      />
    </Container>
  );
}
