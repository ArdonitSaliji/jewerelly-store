import React from 'react'
import './Basket.css'
const Basket = () => {
  return (
    <div className='basket'>
      <h2>Basket Items</h2>
      <div className='basket-items'>
        <div className='basket-item'>
          <h3>Citrine (Oval) </h3>
          <img src={require('../../images/citrine.png')} alt='' />
          <div className='item-info'>
            <label>Quantity: </label> <input defaultValue='1' type='number' />
            <p>Size: 6.2 x 3.9 mm</p>
            <p>Price: $4.62</p>
          </div>

          <button>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Basket
