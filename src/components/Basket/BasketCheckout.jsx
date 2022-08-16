import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
const Checkout = ({ basketState }) => {
  const [radioValue, setRadioValue] = useState('standard')

  const changeRadio = (value) => radioValue === value
  const clickRadio = (e) => setRadioValue(e.currentTarget.value)
  const checkoutItemRef = useRef()
  let val = 0
  basketState && basketState.map(({ price }) => (val += Number(price.split('$').pop())))
  return basketState && basketState.length > 0 ? (
    <div className='checkout'>
      <h2>Proceed to checkout</h2>

      <div className='checkout-items'>
        {basketState?.map(
          (el, i) =>
            el?.image !== require('../Popups/TradeItem/trade-images/sold.jpg') && (
              <div ref={checkoutItemRef} key={i} className='checkout-item'>
                <img src={el?.image} alt='' />
                <p>{el?.size}</p>
                <p>{el?.price}</p>
              </div>
            )
        )}
        <h3 className='items-total'>
          Items Total: ${val.toFixed(2)} <br />
          <hr />
        </h3>
      </div>
      <div className='checkout-shipping'>
        <p className='shipping'>Shipping Options / North Macedonia: </p>
        <div className='shipping-option'>
          <label>
            <input
              style={{ marginRight: '0.3rem' }}
              onChange={(e) => clickRadio(e)}
              type='radio'
              name='option'
              value='standard'
              id='option'
              checked={changeRadio('standard')}
            />
            Standard Shipping [$9.25] <br />
            <p className='shipping-light'>7 - 14 days</p>
          </label>
        </div>
        <div className='shipping-option'>
          <label>
            <input
              style={{ marginRight: '0.3rem' }}
              onChange={(e) => clickRadio(e)}
              type='radio'
              name='option'
              value='express'
              id='option'
              checked={changeRadio('express')}
            />
            Express Shipping [$26.55]
            <br />
            <p className='shipping-light'>2 - 4 days</p>
          </label>
        </div>
      </div>
      <div className='grand-total'>
        <hr />
        <div className='total'>
          <p>Grand Total: $</p>

          <p className='total-p'>
            {radioValue === 'standard' ? (val + 9.25).toFixed(2) : (val + 26.55).toFixed(2)}
          </p>
        </div>

        <hr />
      </div>

      <div className='checkout-buttons'>
        <Link className='checkout-button red' to={'/'}>
          Go Back
        </Link>
        <Link to={'/'} className='checkout-button'>
          Proceed To Checkout
        </Link>
      </div>
    </div>
  ) : (
    <div className='checkout'>
      <div className='checkout-empty'>
        <h2>Your Basket is empty</h2>
      </div>

      <div className='checkout-buttons'>
        <Link className='checkout-button red' to={'/'}>
          Go Back
        </Link>

        <Link to={'/'} className='checkout-button'>
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default Checkout
