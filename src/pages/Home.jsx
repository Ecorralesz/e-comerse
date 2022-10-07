import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../slices/products.slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  Carousel,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  const [categories, setCategories] = useState([]);
  const [productFiltered, setProductFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  useEffect(() => {
    setProductFiltered(productList);
  }, [productList]);

  const filteredCategory = (categoryId) => {
    const filtered = productList.filter(
      (product) => product.category.id === categoryId
    );
    setProductFiltered(filtered);
  };
  // console.log(categories)

  const searchProduct = () => {
    const filtered = productList.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setProductFiltered(filtered);
  };

  return (
    <>
      <Carousel
      style={{marginBottom: "20px"}}      
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.comstar.com.pk/assets/files/blog/future_technology_prospects.png"
            alt="First slide"
            height={"500px"}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://thumbs.dreamstime.com/b/new-skills-knowledge-webinar-training-business-internet-technology-concept-new-skills-knowledge-webinar-training-business-internet-121274023.jpg"
            alt="Second slide"
            height={"500px"}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.tech-hounds.com/wp-content/uploads/2022/03/Technology.jpg"
            alt="Third slide"
            height={"500px"}
          />
        </Carousel.Item>
      </Carousel>
      <Row>
        <Col lg={3}>
          <ListGroup className="mb-3">
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => filteredCategory(category.id)}
                style={{ cursor: "pointer" }}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search Product"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <Button variant="outline-secondary" onClick={searchProduct}>
              Button
            </Button>
          </InputGroup>
          <Row xs={1} md={2} xl={3} className="g-4">
            {productFiltered.map((product) => (
              <Col key={product.id}>
                <Card
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{ height: "100%", padding: "30px" }}
                >
                  <Card.Img variant="top" src={product.productImgs[0]} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      {product.description}
                      {product.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;
