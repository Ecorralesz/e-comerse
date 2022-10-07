import React, { useEffect } from "react";
import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartThunk } from "../slices/cart.slice";
import { purchaseCardThunk } from "../slices/purchases.slice";

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
        <Offcanvas.Body
        style={{textAlign: "center"}}
        >
            <ListGroup>
              {
                cart.map(product => (
                  <ListGroup.Item key={product.id}>
                    <Link
                    to={`/product/${product.id}`}
                    style={{textDecoration: "none"}}
                    >
                    <h3>{product.title}</h3>
                    <h6>{product.brand}</h6>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.productsInCart.quantity}</p>
                    </Link> 
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
            <Button
            variant="warning"
            className="mt-4"
            onClick={() => dispatch(purchaseCardThunk())}
            >
              CheckOut
            </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CartSideBar;
