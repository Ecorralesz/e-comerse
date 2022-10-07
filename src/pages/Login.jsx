import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";



const Login = () => {

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    // console.log(data)
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
      .then(res => {
        localStorage.setItem("token", res.data.data.token)
        console.log(res.data)
        navigate('/')
      })
      .catch(error => {
        if(error.response?.status === 404){
          alert("Invalid Credentials")
        }
        console.log(error.response)
      });
  }

  return (
    <div style={{textAlign: "center"}}>
      <h1 className="mb-5">Login</h1>
      <p>Use this information to login</p>
      <p>Email: carlosc@gmail.com</p>
      <p className="mb-5">Password: carlos1234</p>
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control  {...register("email")} type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register("password")}  type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
