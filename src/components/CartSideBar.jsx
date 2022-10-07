import React, { useEffect } from "react";
import { ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartThunk } from "../slices/cart.slice";

const CartSideBar = ({show, handleClose}) => {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getCartThunk());
  }, [])

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ListGroup>
              {
                cart.map(product => (
                  <ListGroup.Item key={product.id}>
                    <Link
                    to={`/product/${product.cart.id}`}
                    >
                    <h3>{product.title}</h3>
                    <h6>{product.brand}</h6>
                    <p>{product.price}</p>
                    </Link> 
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CartSideBar;
