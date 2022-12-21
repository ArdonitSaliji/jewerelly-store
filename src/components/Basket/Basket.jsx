// import { useEffect, useState } from 'react';
// import Checkout from './BasketCheckout';

const Basket = ({ basketProducts }) => {
  return (
    <div className='basket-container'>
      <div className='basket'>
        <h3 className='details'>Your Basket Details</h3>
        <div className='basket-items'>
          {/* {basketState?.map(
            (el, i) =>
              el.image !== require('../Popups/TradeItem/trade-images/sold.jpg') && (
                <div key={i} className='basket-item'>
                  <h3>{el?.title}</h3>
                  <img src={el?.image} alt='' />
                  <div className='item-info'>
                    <p>{el?.price}</p>
                    <p>{el?.size}</p>
                  </div>
                  <button key={i} onClick={() => {}}>
                    Remove
                  </button>
                </div>
              )
          )} */}
        </div>
      </div>

      {/* <Checkout /> */}
    </div>
  );
};

export default Basket;
