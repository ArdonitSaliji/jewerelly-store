/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { data } from '../data';
import {
  decLengthByOne,
  selectAllProducts,
  subtractPrice,
  sumProductPrices,
  updateBasket,
  updateLength,
  updateProductsQuantity,
} from '../feature/basketSlice';
const Basket = () => {
  const basketProducts = useSelector(selectAllProducts);
  const productsSum = useSelector((state) => state.basket.sum);
  const dispatch = useDispatch();
  const [productPrices, setProductPrices] = useState();
  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      const getUserProducts = async () => {
        const res = await fetch('http://localhost:5000/user/cart/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: JSON.parse(sessionStorage.getItem('user')),
          }),
        });
        const json = await res.json();
        dispatch(updateProductsQuantity(json.foundUser.cart));
        dispatch(updateLength(json.basketProducts.length));
        dispatch(updateBasket(json.basketProducts));

        if (basketProducts.length > 0) {
          const sum = json.basketProducts
            ?.map((product) => {
              const price = product.price.split('$').join('');
              return price;
            })
            ?.reduce((a, b) => Number(a) + Number(b));
          dispatch(sumProductPrices(Number(sum.toFixed(2))));
        }
      };
      getUserProducts();
    }
  }, [dispatch]);
  const deleteBasketProduct = async (e) => {
    const res = await fetch('http://localhost:5000/user/cart/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: JSON.parse(sessionStorage.getItem('user')),
        productName: e.target.parentElement.parentElement.parentElement.id,
      }),
    });
    const json = await res.json();
    const {
      parentElement: {
        previousElementSibling: { previousElementSibling },
      },
    } = e.target;
    const value = Number(previousElementSibling.innerHTML.split('$').join(''));
    dispatch(subtractPrice(value.toFixed(2)));
    dispatch(decLengthByOne());
    e.target.parentElement.parentElement.parentElement.remove();
  };

  const checkout = async () => {
    const res = await fetch('http://localhost:5000/user/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: basketProducts,
      }),
    });
    const json = await res.json();
    window.open(json, '_blank');
    console.log(json);
  };

  const optionArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className='home'>
      <div className='productContainer'>
        <ListGroup>
          {sessionStorage.getItem('isLoggedIn') ? (
            basketProducts.length > 1 ? (
              basketProducts?.map((prod) => (
                <ListGroup.Item id={prod.name} key={prod._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={prod.image} alt={prod.name} fluid rounded />
                    </Col>
                    <Col md={2}>
                      <span>{prod.name[0].toUpperCase() + prod.name.slice(1, -1)}</span>
                      <br />
                      <br />
                      <br />
                      <span>{prod.size}</span>
                    </Col>
                    <Col md={2}>{prod.price}</Col>

                    <Col md={2}>
                      <Form.Control
                        as='select'
                        defaultValue={prod.quantity}
                        onChange={(e) => e.target.value}
                      >
                        {optionArray.map((x, index) => (
                          <option style={{ height: '20px' }} key={index}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        onClick={(e) => {
                          deleteBasketProduct(e);
                        }}
                        type='button'
                        variant='light'
                        // onClick={() =>
                        //   dispatch({
                        //     type: 'REMOVE_FROM_CART',
                        //     payload: prod,
                        //   })
                        // }
                      >
                        <AiFillDelete fontSize='20px' style={{ pointerEvents: 'none' }} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <h3 className='empty-cart'>Your cart is empty!</h3>
            )
          ) : (
            <h3 className='login-first'>Login to add items to cart.</h3>
          )}
        </ListGroup>
      </div>
      <div className='filters summary'>
        <span className='title'>Subtotal ({}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: $ {sessionStorage.getItem('isLoggedIn') && productsSum}
        </span>
        <Button
          type='button'
          onClick={() => {
            if (sessionStorage.getItem('user')) {
              checkout();
            } else {
              toast.error('Login to proceed to checkout!');
            }
            // window.open('https://buy.stripe.com/test_fZe9B91jr9Ix7rG7ss', '_blank');
          }}
        >
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};

export default Basket;
