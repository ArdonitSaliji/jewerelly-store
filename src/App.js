import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Main from './components/Main/Main.jsx'
import Footer from './components/Footer/Footer.jsx'
import Login from './components/Popups/Login/Login.jsx'
import Signup from './components/Popups/Signup/Signup.jsx'
import Forgot from './components/Forgot/Forgot.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TradeItem from './components/Popups/TradeItem/TradeItem.jsx'

function App() {
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)
  const [trade, setTrade] = useState(false)

  return (
    <BrowserRouter>
      <Navbar setLogin={setLogin} setSignup={setSignup} />
      <Routes>
        <Route path='/' element={<Main trade={trade} setTrade={setTrade} />} />
        <Route
          path='/reset-password'
          element={<Forgot setSignup={setSignup} setLogin={setLogin} />}
        />
      </Routes>

      <Login login={login} setLogin={setLogin} setSignup={setSignup} />
      <Signup setLogin={setLogin} signup={signup} setSignup={setSignup} />
      {trade && <TradeItem setTrade={setTrade} />}
      <Footer />
    </BrowserRouter>
  )
}

export default App
