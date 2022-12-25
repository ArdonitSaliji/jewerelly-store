/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { data } from '../../data';
import {
  selectAllProducts,
  sumProductPrices,
  updateBasket,
  updateLength,
  updateProductsQuantity,
} from '../../feature/basketSlice';
const Basket = () => {
  const basketProducts = useSelector(selectAllProducts);
  const productsSum = useSelector((state) => state.basket.sum);
  const dispatch = useDispatch();

  useEffect(() => {
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
      const sum = basketProducts
        .map((product) => {
          const price = product.price.split('$').join('');
          return price;
        })
        .reduce((a, b) => Number(a) + Number(b));
      dispatch(sumProductPrices(sum));
    };
    getUserProducts();
  }, []);
  const optionArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className='home'>
      <div className='productContainer'>
        <ListGroup>
          {sessionStorage.getItem('isLoggedIn') ? (
            basketProducts?.map((prod) => (
              <ListGroup.Item key={prod._id}>
                <Row>
                  <Col md={2}>
                    <Image src={prod.image} alt={prod.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{prod.name}</span>
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
                      type='button'
                      variant='light'
                      // onClick={() =>
                      //   dispatch({
                      //     type: 'REMOVE_FROM_CART',
                      //     payload: prod,
                      //   })
                      // }
                    >
                      <AiFillDelete fontSize='20px' />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          ) : (
            <h3 className='login-first'>Login to add items to basket.</h3>
          )}
        </ListGroup>
      </div>
      <div className='filters summary'>
        <span className='title'>Subtotal ({}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: $ {sessionStorage.getItem('isLoggedIn') && productsSum.toFixed(2)}
        </span>
        <Button type='button'>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Basket;
