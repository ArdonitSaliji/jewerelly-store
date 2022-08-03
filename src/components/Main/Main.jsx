import React from 'react'
import './Main.css'
import data from './data'
const Main = ({ setTrade, setGemState }) => {
  const switchTrade = (e) => {
    setGemState(e.target.firstElementChild.textContent.toLowerCase())
  }
  const allGems = data.map(({ title, image, text }, index) => (
    <div
      key={index}
      className='rock'
      onClick={(e) => {
        setTrade(true)
        switchTrade(e)
      }}
    >
      <h3>{title}</h3>
      <img src={image} alt='' />
      <p>{text}</p>
    </div>
  ))
  return (
    <div>
      <h1 className='main-title'>Trading rare gems and crystals has never been easier.</h1>
      <div className='rocks'>{allGems}</div>
    </div>
  )
}

export default Main
