import { useEffect, useState } from 'react';
import Checkout from './BasketCheckout';
import Items from './BasketItems';

const Basket = ({ basketState, setBasketState }) => {
  const [basketProducts, setBasketProducts] = useState([]);
  const basket = JSON.parse(localStorage.getItem('basket'));

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const getBasketProducts = async () => {
      const res = await fetch('http://localhost:5000/api/user/basket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user }),
      });
      const json = await res.json();
      setBasketProducts(json.allProducts);
    };
    // TODO
    // render basket products
    getBasketProducts();
  }, []);

  useEffect(() => {
    const retriveProducts = JSON.parse(localStorage.getItem('basket'));
    setBasketState(retriveProducts);
  }, [setBasketState]);

  return (
    <div className='basket-container'>
      {basketState && basketState.length > 0 ? (
        <div className='basket'>
          <h3 className='details'>Your Basket Details</h3>
          <div className='basket-items'>
            {basketState.map(
              (el, i) =>
                el.image !== require('../Popups/TradeItem/trade-images/sold.jpg') && (
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
                        basket.splice(i, 1);
                        setBasketState(basket);
                        localStorage.setItem('basket', JSON.stringify(basket));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )
            )}
            {localStorage.setItem('basketLength', JSON.stringify(basketState.length))}
          </div>
        </div>
      ) : (
        <div className='basket'>
          <div className='basket-empty'>
            <h3>Your Basket is empty</h3>
          </div>
        </div>
      )}

      <Checkout basketState={basketState} setBasketState={setBasketState} />
    </div>
  );
};

export default Basket;
