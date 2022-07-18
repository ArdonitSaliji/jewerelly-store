import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Main from './components/Main/Main.jsx'
import Footer from './components/Footer/Footer.jsx'
import './components/Login/Login.css'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
function App() {
  const [login, setLogin] = React.useState(false)
  const [signup, setSignup] = React.useState(false)

  return (
    <div className='container'>
      <Navbar setLogin={setLogin} setSignup={setSignup} />
      <Main />
      <Login login={login} setLogin={setLogin} />
      <Signup signup={signup} setSignup={setSignup} />
      <Footer />
    </div>
  )
}

export default App
