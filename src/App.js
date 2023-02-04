import { BrowserRouter, Routes, Router , Route, Link} from 'react-router-dom' 
import Login from "./Login.js"
import Home from "./Home.js"
import NavBar from './NavBar.js';
import Blockchain from './Pages/Blockchain/Blockchain.js';
import Validate from './Pages/Validate/Validate.js';
import Wallet from './Pages/Wallet/Wallet.js';
import Validators from './Pages/Validators/Validators.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/home" element={<Home />}/>
          <Route exact path="/test" element={<NavBar />}/>
          <Route exact path="/blockchain" element={<Blockchain />}/>
          <Route exact path="/validate" element={<Validate />}/>
          <Route exact path="/wallet" element={<Wallet />}/>
          <Route exact path="/validators" element={<Validators />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
