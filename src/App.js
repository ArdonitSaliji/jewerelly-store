import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Main from './components/Main/Main.jsx'
import Login from './components/Popups/Login/Login.jsx'
import Signup from './components/Popups/Signup/Signup.jsx'
import Forgot from './components/ForgotPassword/ForgotPass.jsx'
import TradeItem from './components/Popups/TradeItem/TradeItem.jsx'
import Basket from './components/Basket/Basket.jsx'
import './App.css'
import Account from './components/Popups/Account/Account.jsx'

function App() {
  const [login, setLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [trade, setTrade] = useState(false)
  const [gemState, setGemState] = useState('')
  const [basketState, setBasketState] = useState([])
  const status = JSON.parse(sessionStorage.getItem('loginStatus'))
  const [loginStatus, setLoginStatus] = useState(status)
  const [accountPopup, setAccountPopup] = useState(false)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.same')) {
      setAccountPopup(false)
    }
  })
  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar
          accountPopup={accountPopup}
          setAccountPopup={setAccountPopup}
          loginStatus={loginStatus}
          setLoginStatus={setLoginStatus}
          setLogin={setLogin}
          setSignUp={setSignUp}
          basketState={basketState}
        />

        <Routes>
          <Route
            path='/jewerelly-eCommerce'
            element={<Main trade={trade} setTrade={setTrade} setGemState={setGemState} />}
          />
          <Route
            path='/jewerelly-eCommerce/reset-password'
            element={<Forgot setSignUp={setSignUp} setLogin={setLogin} />}
          />
          <Route
            path='/jewerelly-eCommerce/basket'
            element={<Basket basketState={basketState} setBasketState={setBasketState} />}
          />
        </Routes>

        {login && (
          <Login
            loginStatus={loginStatus}
            setLoginStatus={setLoginStatus}
            login={login}
            setLogin={setLogin}
            setSignUp={setSignUp}
          />
        )}
        {signUp && <Signup signUp={signUp} setLogin={setLogin} setSignUp={setSignUp} />}

        {trade && (
          <TradeItem
            basketState={basketState}
            setBasketState={setBasketState}
            setTrade={setTrade}
            gemState={gemState}
          />
        )}
        <Account
          setLoginStatus={setLoginStatus}
          accountPopup={accountPopup}
          setAccountPopup={setAccountPopup}
        />
        <div className='footer'>
          <h2>&copy; Jewellery Traders</h2>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
