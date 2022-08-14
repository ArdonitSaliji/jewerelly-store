import { useRef } from 'react'
import { useEffect } from 'react'
import './Basket.css'

const Basket = ({ basketState, setBasketState }) => {
  //
  const basket = JSON.parse(localStorage.getItem('basket'))
  useEffect(() => {
    const retriveProducts = JSON.parse(localStorage.getItem('basket'))
    setBasketState(retriveProducts)
  }, [])
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
      </div>
    </div>
  )
}

export default Basket
