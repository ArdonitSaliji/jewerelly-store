import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Main from './components/Main.jsx';
import Forgot from './components/ForgotPass.jsx';
import Basket from './components/Basket.jsx';
import Checkout from './components/Checkout.jsx';
import Footer from './components/Footer.jsx';
import SelectProducts from './components/SelectProducts';
import Sidebar from './components/Sidebar.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [gemState, setGemState] = useState('');
  const [basketProducts, setBasketProducts] = useState([]);

  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar basketProducts={basketProducts} setBasketProducts={setBasketProducts} />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Main gemState={gemState} setGemState={setGemState} />} />
          <Route path={`/product/:name`} element={<SelectProducts />} />
          <Route path='/reset-password' element={<Forgot />} />
          <Route path='/basket' element={<Basket basketProducts={basketProducts} />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>

        <Sidebar />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
