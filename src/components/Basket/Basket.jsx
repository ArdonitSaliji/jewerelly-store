import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './Basket.css'

const Basket = ({ basketState, setBasketState }) => {
  useEffect(() => {
    const retriveProducts = JSON.parse(localStorage.getItem('basket'))
    setBasketState(retriveProducts)
  }, [])
  const [radioValue, setRadioValue] = useState(true)

  const changeValue = (e) => {
    const { name, value } = e.target

    setRadioValue({ [name]: value })
  }

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
                    onClick={(e, index) => {
                      const removeItem = basket.splice(index, i)
                      setBasketState(basketState.splice(index, i))
                      localStorage.setItem('basket', JSON.stringify(removeItem))
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
            <label htmlFor='standard'>
              <input
                onChange={(e) => changeValue(e)}
                type='radio'
                name='option'
                value='standard'
                checked={radioValue.selectedOption === 'standard'}
              />
              Standard Shipping [$9.25]
            </label>
          </div>
          <div className='shipping-option'>
            <label htmlFor='express'>
              <input
                onChange={(e) => changeValue(e)}
                type='radio'
                name='option'
                value='express'
                checked={radioValue.selectedOption === 'express'}
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
