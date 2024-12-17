import React, { useState } from "react";

import { Button, Form, Col } from "react-bootstrap";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";

import { savePaymentMethod } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function PaymentScreen() {
  
  // PULLING OUT SHIPPING ADDRESS FROM CART
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;
  const navigate = useNavigate();
  // STATE
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    navigate('/shipping')
  }

  // HANDLERS

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    // AFTER CHOSING THE PAYMENT METHOD REDIRECT USER TO PlaceOrder SCREEN
    navigate('/placeorder')
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
