import React, { useState } from 'react'
import './Main.css'
import { data, listing } from './data'
import { AiOutlineSearch } from 'react-icons/ai'

const Main = ({ setTrade, setGemState }) => {
  const [searchState, setSearchState] = useState()
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
    <div className='main'>
      <div className='main-title' style={{ textAlign: 'center', padding: '2rem 0 0rem' }}>
        <h1>Trading rare gems and crystals has never been easier.</h1>
      </div>

      <div className='main-search'>
        <div className='search'>
          <AiOutlineSearch style={{ fontSize: '22px', marginLeft: '0.5rem' }} />
          <input
            onChange={(e) => setSearchState(e.target.value)}
            type='text'
            placeholder='Search...'
          />
        </div>
        <div className='filter'>
          <label style={{ fontSize: '20px', marginRight: '0.5rem' }}>Sort by: </label>
          <select>
            {listing.map((value, i) => (
              <option key={i}>{value}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='gems' style={{ margin: '0 10rem', userSelect: 'none' }}>
        {searchState
          ? allGems.filter(({ props: { children } }) =>
              children[0].props.children.toLowerCase().includes(searchState.toLowerCase())
            )
          : allGems}
      </div>
    </div>
  )
}

export default Main
