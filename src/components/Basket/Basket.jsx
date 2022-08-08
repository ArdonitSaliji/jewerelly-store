import React from 'react'
import './Basket.css'
const Basket = () => {
  return (
    <div className='basket'>
      <h2>Basket Items</h2>
      <div className='basket-items'>
        <div className='basket-item'>
          <h3>Item</h3>
          <img src={require('../../images/citrine.png')} alt='' />
        </div>
        <div className='basket-item'>
          <h3>Item</h3>
          <img src='' alt='' />
        </div>
        <div className='basket-item'>
          <h3>Item</h3>
          <img src='' alt='' />
        </div>
      </div>
    </div>
  )
}

export default Basket
