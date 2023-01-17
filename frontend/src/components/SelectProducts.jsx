import { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sumProductPrices, updateBasket, updateLengthByOne } from '../feature/basketSlice';
const SelectProducts = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basketProducts);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const product = JSON.parse(sessionStorage.getItem('selectProduct').toLocaleLowerCase());
      const res = await fetch(`http://localhost:5000/products/${product}`);
      let json = await res.json();
      setProducts(json);
    })();
  }, []);

  const addToBasket = async (e) => {
    const res = await fetch('http://localhost:5000/user/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: e.target.parentElement.parentElement.id,
        product: e.target.parentElement.parentElement.title,
        user: JSON.parse(sessionStorage.getItem('user')),
      }),
    });
    const json = await res.json();
    if (res.status === 202) {
      dispatch(updateBasket([...basket, json]));
      dispatch(updateLengthByOne());
      const {
        previousElementSibling: { children },
      } = e.target;
      const split = children[1].innerHTML;
      const value = split.split('Price: $');
      dispatch(sumProductPrices(Number(value)));
    }
  };

  return (
    <div className='product-container'>
      {products?.map((product) => {
        return (
          <div className='product' title={product.name} id={product._id} key={product._id}>
            <img src={process.env.PUBLIC_URL + product.image} alt='' />
            <div className='content'>
              <div className='description'>
                <p>Size: {product.size}</p>
                <p>Price: {product.price}</p>
              </div>
              <div
                className='cart-container'
                onClick={(e) => {
                  sessionStorage.getItem('user')
                    ? addToBasket(e)
                    : toast.error('You need to login first!', {
                        position: 'top-center',
                      });
                }}
              >
                <AiOutlineShoppingCart className='cart' />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectProducts;
