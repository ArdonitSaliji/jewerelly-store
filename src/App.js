import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Main from './components/Main.jsx';
import Forgot from './components/ForgotPassword/ForgotPass.jsx';
import Basket from './components/Basket/Basket.jsx';
import Checkout from './components/Checkout.jsx';
import Footer from './components/Footer.jsx';
import SelectProducts from './components/SelectProducts';
import Sidebar from './components/Sidebar.jsx';

function App() {
  const [trade, setTrade] = useState(false);
  const [gemState, setGemState] = useState('');
  const [basketProducts, setBasketProducts] = useState([]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const getBasketProducts = async () => {
      const res = await fetch('http://localhost:5000/api/user/basket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
        }),
      });
      let json = await res.json();
      sessionStorage.setItem('basketItems', JSON.stringify(json.length));
      setBasketProducts(json);
    };
    getBasketProducts();
  }, []);

  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <Main
                trade={trade}
                gemState={gemState}
                setTrade={setTrade}
                setGemState={setGemState}
              />
            }
          />
          <Route path={`/product/:name`} element={<SelectProducts />} />
          <Route
            path='/reset-password'
            element={
              <Forgot
              // setSignUp={setSignUp} setLogin={setLogin}
              />
            }
          />
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
