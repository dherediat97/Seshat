import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import theme from './theme';
import { Box } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Box
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      marginRight={8}
      marginLeft={8}
    >
      <App />
    </Box>
  </ThemeProvider>
);
