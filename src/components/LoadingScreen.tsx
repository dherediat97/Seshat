import { Box, CircularProgress } from '@mui/material';

export default function LoadingScreen() {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      display={'flex'}
    >
      <CircularProgress color={'primary'} />
    </Box>
  );
}
