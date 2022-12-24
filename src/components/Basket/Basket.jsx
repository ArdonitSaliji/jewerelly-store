import { useEffect, useState } from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts, updateLength } from '../../feature/basketSlice';
const Basket = () => {
  const [total, setTotal] = useState();
  const [userProducts, setUserProducts] = useState([]);
  const basketProducts = useSelector(selectAllProducts);
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
      dispatch(updateLength(json.length));
      setUserProducts(json);
    };
    getUserProducts();
  }, []);
  return (
    <div className='home'>
      <div className='productContainer'>
        <ListGroup>
          {sessionStorage.getItem('isLoggedIn') ? (
            userProducts?.map((prod) => (
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
                      value={prod.qty}
                      // onChange={(e) =>
                      //   dispatch({
                      //     type: 'CHANGE_CART_QTY',
                      //     payload: {
                      //       id: prod.id,
                      //       qty: e.target.value,
                      //     },
                      //   })
                      // }
                    >
                      {[...Array(prod.inStock).keys()].map((x, index) => (
                        <option key={index}>{x + 1}</option>
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
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <Button type='button'>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Basket;
