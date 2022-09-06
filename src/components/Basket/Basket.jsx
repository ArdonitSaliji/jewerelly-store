import { useEffect } from 'react'
import './Basket.css'
import Checkout from './BasketCheckout'
import Items from './BasketItems'

const Basket = ({ basketState, setBasketState }) => {
  useEffect(() => {
    const retriveProducts = JSON.parse(localStorage.getItem('basket'))
    setBasketState(retriveProducts)
  }, [setBasketState])

  return (
    <div className='basket-container'>
      <Items basketState={basketState} setBasketState={setBasketState} />
      <Checkout basketState={basketState} setBasketState={setBasketState} />
    </div>
  )
}

export default Basket
