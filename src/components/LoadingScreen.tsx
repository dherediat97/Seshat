import { Box, CircularProgress } from '@mui/material';

export default function LoadingScreen() {
  return (
    <Box
      justifyContent="center"
      position={'fixed'}
      bottom={0}
      width={'100%'}
      left={0}
      alignItems="center"
      minHeight="5vh"
      display={'flex'}
    >
      <CircularProgress color={'primary'} />
    </Box>
  );
}
