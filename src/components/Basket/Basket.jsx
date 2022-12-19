import { useEffect, useState } from 'react';
import Checkout from './BasketCheckout';

const Basket = ({ basketState, setBasketState }) => {
  useEffect(() => {
    const retriveProducts = JSON.parse(localStorage.getItem('basket'));
    setBasketState(retriveProducts);
  }, [setBasketState]);
  const [userProducts, setUserProducts] = useState([]);
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const getBasketProducts = async () => {
      const res = await fetch('http://localhost:5000/api/user/basket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
        }),
      });
      let json = await res.json();
      console.log(json);
      setUserProducts(json);
    };
    getBasketProducts();
  }, []);
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
          {localStorage.setItem('basketLength', JSON.stringify(basketState.length))}
        </div>
      </div>

      <Checkout basketState={basketState} setBasketState={setBasketState} />
    </div>
  );
};

export default Basket;
