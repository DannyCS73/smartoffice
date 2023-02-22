import React from "react";
import { BrowserRouter, Routes, Router , Route, Link} from 'react-router-dom' 
import Dashboard from './components/Dashboard/dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Poppins'
    },
  },
  palette: {
    primary: {
      main: '#efefef',
    },
} ,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
            <Route exact path="/" element={<Dashboard />}/>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
