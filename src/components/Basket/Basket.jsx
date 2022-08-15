import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './Basket.css'

const Basket = ({ basketState, setBasketState }) => {
  useEffect(() => {
    const retriveProducts = JSON.parse(localStorage.getItem('basket'))
    setBasketState(retriveProducts)
  }, [])
  const [radioValue, setRadioValue] = useState('standard')

  const changeRadio = (value) => radioValue === value
  const radioClick = (e) => setRadioValue(e.currentTarget.value)
  const basket = JSON.parse(localStorage.getItem('basket'))
  const checkoutItemRef = useRef()
  return (
    <div className='basket-container'>
      <div className='basket'>
        <h2>Basket Items</h2>
        <div className='basket-items'>
          {basketState?.map(
            (el, i) =>
              el?.image !== require('../Popups/TradeItem/trade-images/sold.jpg') && (
                <div key={i} className='basket-item'>
                  <h3>{el?.title}</h3>
                  <img src={el?.image} alt='' />
                  <div className='item-info'>
                    <p>{el?.price}</p>
                    <p>{el?.size}</p>
                  </div>
                  <button
                    onClick={() => {
                      basket.splice(i, 1)
                      setBasketState(basket)
                      localStorage.setItem('basket', JSON.stringify(basket))
                    }}
                  >
                    Remove
                  </button>
                </div>
              )
          )}
        </div>
      </div>
      <div className='checkout'>
        <h2>Proceed to checkout</h2>
        <p>Items: </p>
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
        </div>
        <div className='checkout-shipping'>
          <p>Shipping Options</p>
          <div className='shipping-option'>
            <label>
              <input
                onChange={(e) => radioClick(e)}
                type='radio'
                name='option'
                value='standard'
                id='option'
                checked={changeRadio('standard')}
              />
              Standard Shipping [$9.25]
            </label>
          </div>
          <div className='shipping-option'>
            <label>
              <input
                onChange={(e) => radioClick(e)}
                type='radio'
                name='option'
                value='express'
                id='option'
                checked={changeRadio('express')}
              />
              Express Shipping [$16.25]
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Basket
