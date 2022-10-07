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



  return (
    <div>
      <h2
      onClick={() => navigate('/')}
      style={{cursor: "pointer"}}
      >Home</h2>
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
                  style={{cursor: "pointer", padding: "15px"}}
                  key={product.id}
                  className='mb-2'
                  onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <Col
                    className='mb-5'
                    md={3}>
                    <h5>{product.title}</h5>
                    <p> Brand: {product.brand}</p>
                    <p> Quantity: {product.quantity}</p>
                    
                    </Col>
                    <Col>
                    <p> Price: ${product.price}</p>
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