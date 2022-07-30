import React from 'react'
import './Main.css'
import data from './data'
const Main = () => {
  const allGems = data.map(({ title, image, text }) => (
    <div className='rock'>
      <h3>{title}</h3>
      <img src={image} alt='' />
      <p>{text}</p>
      <button type='button' className='rock-btn'>
        Trade
      </button>
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
