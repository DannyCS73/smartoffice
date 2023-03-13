import React from "react";
import { BrowserRouter, Routes, Router , Route, Link} from 'react-router-dom' 
import Dashboard from './components/Pages/Dashboard/dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sensors from "./components/Pages/Sensors/Sensors";
import Users from "./components/Pages/Users/Users";
import LogOnPage from "./components/Pages/LogOn/LogOnPage";
import Validators from "./components/Pages/Validators/Validators";


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
            <Route exact path="/" element={<LogOnPage />}/>
            <Route exact path="/dashboard" element={<Dashboard />}/>
            <Route exact path="/Sensors" element={<Sensors />}/>
            <Route exact path="/Users" element={<Users />}/>
            <Route exact path="/validators" element={<Validators/>}/>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
