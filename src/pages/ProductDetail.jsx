import React from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const productList = useSelector((state) => state.products);
  const productDetail = productList.find((news) => news.id === Number(id));
  const relatedProducts = productList.filter(
    (product) => product.category.id === productDetail?.category.id
  );

  return (
    <Row>
      <Col className="mb-5">
      <h1>{productDetail?.title}</h1>
      <br />
        <br />
        <p>{productDetail?.description}</p>
        <br />
        <p> <b>Price:</b> {productDetail?.price}</p>
        <br />
        <img className="img-fluid" src={productDetail?.productImgs[0]} width={"200px"} />
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
              <img src={products.productImgs[1]} alt="" className="img-fluid" />
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
