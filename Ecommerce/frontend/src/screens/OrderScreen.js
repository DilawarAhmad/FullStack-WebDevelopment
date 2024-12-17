
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
//import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  payOrder,
} from "../redux/slices/orderSlice";

 
function OrderScreen() {
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const navigate = useNavigate();
  const order  = useSelector((state) => state.order );
  const { orderDetails, error, loading } = order ;
 
  // const orderPay = useSelector((state) => state.orderPay);
  // const { loading: loadingPay, success: successPay } = orderPay;

  // const orderDeliver = useSelector((state) => state.orderDeliver);
  // const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.user );
  const { userDetails } = userLogin;

  let updatedOrderDetails = orderDetails;

  if (updatedOrderDetails && updatedOrderDetails.orderItems && updatedOrderDetails.orderItems.length > 0) {
    const itemsPrice = updatedOrderDetails.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    ).toFixed(2);
  
    updatedOrderDetails = { ...updatedOrderDetails, itemsPrice };
  }
  
 
  // PAYPAL BUTTONS
  console.log("paypall");
  const addPayPalScript = () => {
    console.log("loadingg...")
    const script = document.createElement("script");
    console.log("paypall script loading");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AUxmwQEugyCde2a8UHqAFRMU2ixMS82610YYd2Z4MHu396-pWQxnfHlPwfG2HVCiyOyYe0WcxkeQcHxw";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
      console.log("paypall scripted loaded");
    };
    document.body.appendChild(script);
  };

  useEffect(() => {

    // IS USER IS NOT LOGGED IN THEN REDIRECT TO LOGIN PAGE
    if (!userDetails) {
      navigate("/login");
    }else if (!orderDetails.isPaid) {
      console.log("not orderdetails.ispaid");
      // ACTIVATING PAYPAL SCRIPTS
      if (!window.paypal) {
        console.log("rendering paypal script");
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderDetails, userDetails]);
  
  // Calculate the total price of each individual item
const calculateItemsPrice = () => {
  if (orderDetails.orderItems && orderDetails.orderItems.length > 0) {
    return orderDetails.orderItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) * item.qty;
      return total + itemPrice;
    }, 0);
  }
  return 0;
};

// Call the calculateItemsPrice method to get the total price
const itemsPrice = calculateItemsPrice();

 
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderDetails._id, paymentResult));
    console.log(orderDetails._id)

  };
  useEffect(() => {
    if (sdkReady) {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: function(data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: `${orderDetails.totalPrice}`
                }
              }]
            });
          },
          onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
              alert('Transaction completed by ' + details.payer.name.given_name);
              const paymentResult = {
                id: data.orderID,
                status: data.orderStatus,
                email_address: details.payer.email_address
              };
              successPaymentHandler(paymentResult);
            });
          },
          onError: function(err) {
            console.error('PayPal Checkout error', err);
          }
        }).render('#paypal-button-container');
      }
    }
  }, [sdkReady, orderDetails.totalPrice]);
   

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Name: {userDetails.User}</strong>
              </p>

              <p>
                <strong>Email: </strong>
                <a href={`mailto:${userDetails.User}`}>{userDetails.User}</a>
              </p>

              <p>
                <strong>Shipping Address: </strong>
                {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.postalCode},{" "}
                {orderDetails.shippingAddress.country}
              </p>

              {orderDetails.isDeliver ? (
                <Message variant="success">
                  Delivered on{" "}
                  {orderDetails.deliveredAt
                    ? orderDetails.deliveredAt.substring(0, 10)
                    : null}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>

              <p>
                <strong>Payment Method: </strong>
                {orderDetails.paymentMethod}
              </p>

              {orderDetails.isPaid ? (
                <Message variant="success">
                  Paid   {orderDetails.paidAt ? orderDetails.paidAt.substring(0, 10) : null}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              {orderDetails.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetails.orderItems.map((item, index) => {
                    const imageUrl = item.image
                    ? `http://127.0.0.1:8000${item.image}`
                    : "/path/to/default/image.jpg";
                    return (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ₹{item.price} = ₹
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                )})}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Products Cost:</Col>

                  <Col>₹{itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>

                  <Col>₹{orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>

                  <Col>₹{orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>

                  <Col>₹{orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!orderDetails.isPaid && (
                <ListGroup.Item>
                  {loading  && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                   <div id="paypal-button-container"></div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>

             
          </Card>
        </Col>
      </Row>
      
    </div>
  );
}

export default OrderScreen;
{/*<PayPalButton
                      amount={orderDetails.totalPrice}
                      onSuccess={successPaymentHandler}
                    />*/}
                    