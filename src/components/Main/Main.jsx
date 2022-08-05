import React from 'react'
import './Main.css'
import data from './data'
import { AiOutlineSearch } from 'react-icons/ai'

const Main = ({ setTrade, setGemState }) => {
  const switchTrade = (e) => {
    setGemState(e.target.firstElementChild.textContent.toLowerCase())
  }
  const allGems = data.map(({ title, image, text }, index) => (
    <div
      key={index}
      className='gem'
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
      <div className='main-title'>
        <h1>Trading rare gems and crystals has never been easier.</h1>
      </div>

      <div className='main-search'>
        <div className='search'>
          <AiOutlineSearch className='search-icon' />
          <input type='text' placeholder='Search gem...' />
        </div>
        <div className='filter'>
          <label>Sort by: </label>
          <select>
            <option value=''>Price - High To Low</option>
            <option value=''>Price - Low To High</option>
            <option value=''>Gemstones - A to Z</option>
            <option value=''>Gemstones - Z to A</option>
            <option value=''>Size - Largest To Smallest</option>
            <option value=''>Size - Smallest To Largest</option>
          </select>
        </div>
      </div>

      <div className='gems'>{allGems}</div>
    </div>
  )
}

export default Main
