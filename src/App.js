import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Main from './components/Main/Main.jsx'
import Footer from './components/Footer/Footer.jsx'
import './components/Login/Login.css'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Forgot from './components/Forgot/Forgot.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  // const [mainState, setMainState] = React.useState(<Main />)
  const [login, setLogin] = React.useState(false)
  const [signup, setSignup] = React.useState(false)

  return (
    <BrowserRouter>
      <div>
        <Navbar setLogin={setLogin} setSignup={setSignup} />

        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path='/reset-password'
            element={<Forgot setSignup={setSignup} setLogin={setLogin} />}
          />
        </Routes>

        <Login login={login} setLogin={setLogin} setSignup={setSignup} />
        <Signup setLogin={setLogin} signup={signup} setSignup={setSignup} />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
