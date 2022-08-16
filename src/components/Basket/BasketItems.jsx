const Items = ({ basketState, setBasketState }) => {
  const basket = JSON.parse(localStorage.getItem('basket'))
  return basketState && basketState.length > 0 ? (
    <div className='basket'>
      <h3 className='details'>Your Basket Details</h3>
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
                  key={i}
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
  ) : (
    <div className='basket'>
      <div className='basket-empty'>
        <h2>Add Items To Proceed To Checkout</h2>
      </div>
    </div>
  )
}

export default Items
