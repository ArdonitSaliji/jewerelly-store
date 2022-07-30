import React from 'react'
import './TradeItem.css'
import { AiOutlineClose } from 'react-icons/ai'

const TradeItem = () => {
  return (
    <div className='trade-container'>
      <div className='trade'>
        <div className='trade-options'>
          <a>Buy</a>
          <a>Sell</a>
        </div>
        <div className='trade-image'>
          <h2>Citrine</h2>
          <img src={require('../../../images/citrine.png')} alt='' />
        </div>

        {/* <AiOutlineClose className='x' /> */}
      </div>
    </div>
  )
}

export default TradeItem
