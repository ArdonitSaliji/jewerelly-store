// import { useEffect, useState } from 'react';
// import Checkout from './BasketCheckout';

import { useEffect, useState } from 'react';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../feature/basketSlice';
const Basket = () => {
  const [total, setTotal] = useState();
  const basketProducts = useSelector(selectAllProducts);
  return (
    <div className='home'>
      <div className='productContainer'>
        <ListGroup>
          {basketProducts.map((prod, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
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
          ))}
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
