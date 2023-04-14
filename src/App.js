import React from "react";
import { BrowserRouter, Routes, Router , Route, Link} from 'react-router-dom' 
import Dashboard from './components/Pages/Dashboard/dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sensors from "./components/Pages/Sensors/Sensors";
import Users from "./components/Pages/Users/Users";
import LogOnPage from "./components/Pages/LogOn/LogOnPage";
import Validators from "./components/Pages/Blockchain/Validators/Validators/Validators";
import Wallet from "./components/Pages/Wallet/wallet";
import Rooms from "./components/Pages/Rooms/rooms";
import Admin from "./components/Admin/admin";
import Landlord from "./components/Landlord/landlord";
import DashboardHandler from "./components/Pages/Dashboard/dashboardHandler";


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
            <Route exact path="/dashboard" element={<DashboardHandler />}/>
            <Route exact path="/Sensors" element={<Sensors />}/>
            <Route exact path="/Users" element={<Users />}/>
            <Route exact path="/validators" element={<Validators/>}/>
            <Route exact path="/wallet" element={<Wallet/>}/>
            <Route exact path="/rooms" element={<Rooms/>}/>
            <Route exact path="/admin" element={<Admin/>}/>
            <Route exact path="/landlord" element={<Landlord/>}/>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
