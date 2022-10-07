import React, { useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../slices/purchases.slice';

const Puchases = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchases = useSelector(state => state.purchases)

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, []);

  console.log(purchases)

  return (
    <div>
      <h1>purchases</h1>
      <ListGroup>
        {
          purchases.map(purchase => (
            <ListGroup.Item 
            key={purchase.id}
            >
              {
                purchase.cart.products.map(product => 
                  <Row
                  onClick={() => navigate(`/product/${product.id}`)}
                  className='border.bt'
                  >
                    <Col md={3}>
                    <h4>{product.title}</h4>
                    <p> Brand: {product.brand}</p>
                    <p> Price: {product.price}</p>
                    <p> Quantity: {product.quantity}</p>
                    
                    </Col>
                    <Col>
                    <p>{product.description}</p>
                    </Col>
                  </Row>
                  )
              }
            </ListGroup.Item>
          ))
        }
      </ListGroup>

    </div>
  );
};

export default Puchases;