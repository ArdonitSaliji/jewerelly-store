import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Main from './components/Main/Main.jsx'
import Login from './components/Popups/Login/Login.jsx'
import Signup from './components/Popups/Signup/Signup.jsx'
import Forgot from './components/ForgotPassword/ForgotPass.jsx'
import TradeItem from './components/Popups/TradeItem/TradeItem.jsx'
import './App.css'
function App() {
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)
  const [trade, setTrade] = useState(false)
  const [gemState, setGemState] = useState('')

  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar setLogin={setLogin} setSignup={setSignup} />
        <Routes>
          <Route
            path='/'
            element={<Main trade={trade} setTrade={setTrade} setGemState={setGemState} />}
          />
          <Route
            path='/reset-password'
            element={<Forgot setSignup={setSignup} setLogin={setLogin} />}
          />
        </Routes>

        <Login login={login} setLogin={setLogin} setSignup={setSignup} />
        <Signup setLogin={setLogin} signup={signup} setSignup={setSignup} />

        {trade && <TradeItem setTrade={setTrade} gemState={gemState} />}

        <div className='footer'>
          <h2>&copy; Jewellery Traders</h2>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
