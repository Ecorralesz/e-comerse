import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addCartThunk } from "../slices/cart.slice";

const ProductDetail = () => {
  const { id } = useParams();
  const productList = useSelector((state) => state.products);
  const [ rate, setRate ] = useState(0);
  const productDetail = productList.find((news) => news.id === Number(id));
  const navigate = useNavigate();
  const relatedProducts = productList.filter(
    (product) => product.category.id === productDetail?.category.id
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setRate(0)
  }, [id]);

  const addToCart = () => {
    const cart = {
        id: id,
        quantity: rate
    } 
    dispatch(addCartThunk(cart));
  }

  return (
    <Row>
      <Col className="mb-5">
      <h1>{productDetail?.title}</h1>
      <h6
      onClick={() => navigate(-1)}
      style={{cursor: "pointer"}}
      >
        Go Back
      </h6>
      <br />
        <br />
        <p>{productDetail?.description}</p>
        <br />
        <p> <b>Price:</b> {productDetail?.price}</p>
        <div className="rate">
        <Button 
        className="me-3"
        onClick={() => setRate(rate-1)}
        >
          -
        </Button>
        {rate}
        <Button
        onClick={() => setRate(rate+1)}
        className="ms-3"
        >
          +
        </Button>
        <br />
        <Button
        className="mt-3"
        onClick={addToCart}
        >
          Add to Cart
        </Button>
        </div>
        <br />
        <img className="img-fluid" src={productDetail?.productImgs[0]} width={"200px"} height={"200px"} style={{marginRight: "100px"}}/>
        <img className="img-fluid" src={productDetail?.productImgs[1]} width={"200px"} height={"200px"} style={{marginRight: "100px"}}/>
        <img className="img-fluid" src={productDetail?.productImgs[2]} width={"200px"} height={"200px"} style={{marginRight: "100px"}}/>
      </Col>
      <Col lg={3}>
      <ListGroup>
        <h4> <b>Related Products</b> </h4>
      {
          relatedProducts.map(products => ( 
            <ListGroup.Item key={products.id} >
              <Link
              to={`/product/${products.id}`}
              >
              <img src={products.productImgs[0]} alt="" className="img-fluid" width={"100px"} height={"100px"}/>
              {products.title}
              </Link>
            </ListGroup.Item>
          ))
        }
    </ListGroup>

      </Col>
    </Row>
  );
};

export default ProductDetail;
