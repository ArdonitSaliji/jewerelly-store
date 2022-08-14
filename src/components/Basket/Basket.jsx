import { useRef } from "react";
import { useEffect } from "react";
import "./Basket.css";
const Basket = ({ basketState }) => {
  useEffect(() => {
    sessionStorage.setItem("basket", JSON.stringify(basketState));
  }, [basketState]);
  const basket = JSON.parse(sessionStorage.getItem("basket"));
  return (
    <div className="basket-container">
      <div className="basket">
        <h2>Basket Items</h2>
        <div className="basket-items">
          {basket?.map((el, i) => (
            <div key={i} className="basket-item">
              <h3>{el.title}</h3>
              <img src={el.image} alt="" />
              <div className="item-info">
                <p>{el.price}</p>
                <p>{el.size}</p>
              </div>
              <button onClick={(e) => e.target.parentElement.remove()}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="checkout">
        <h2>Proceed to checkout</h2>
        <p>Items: </p>
        <div className="checkout-items">
          <div className="checkout-item">
            <img src={require("../../images/citrine.png")} alt="" />
            3.6 x 6.3 mm
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
