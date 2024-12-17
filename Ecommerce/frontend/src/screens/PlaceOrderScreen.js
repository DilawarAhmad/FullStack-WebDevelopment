import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrderDetails } from "../redux/slices/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { fetchUserDetails } from "../redux/slices/userSlice";

function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const { orderDetails, loading, error } = order;
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  //  console.log(cart )
  // PRICE CALCULATIONS
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const data = {
    orderItems: cart.cartItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: itemsPrice.toFixed(2).toString(),
    shippingPrice: shippingPrice.toFixed(2).toString(),
    taxPrice: taxPrice.toFixed(2).toString(),
    totalPrice: totalPrice.toString(),
  };

  // console.log(data)
  const placeOrder = () => {
    dispatch(createOrder(data))
      .then(() => {
        setTimeout(() => {
          console.log(orderDetails);
          navigate(`/orderDetail`);
        }, 1000); // Delay of 1 second (1000 milliseconds)
      })
      .catch((error) => {
        console.log("error occured on order creation", error);
      });
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="max-w-3xl mx-auto p-6 pt-0 border rounded-lg shadow-lg bg-white">
        <h2 className="text-center text-lime-600 font-serif text-2xl">
          Shipping Screen
        </h2>
        <p>
          <strong>Shipping Address: </strong>
          <p>
            {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
        </p>

        <p>
          <strong>Payment Method: </strong>
          {cart.paymentMethod}
        </p>

        <h2 className="text-2xl text-green-500 font-serif">Order Items :</h2>
        {cart.cartItems.length === 0 ? (
          <Message variant="info">Your cart is empty</Message>
        ) : (
          <div>
            {cart.cartItems.map((item, index) => {
              const imageUrl = item.image
                ? `http://127.0.0.1:8000${item.image}`
                : "/path/to/default/image.jpg";
              return (
                <div key={index}>
                  <img src={imageUrl} alt={item.name} fluid rounded />
                  <p><Link to={`/product${item.product}`}>Name : {item.name}</Link></p>
                  <p>Price : {item.qty} X ₹{item.price} = ₹
                  {(item.qty * item.price).toFixed(2)}</p>
                  <button
                    type="button"
                    className="border w-36 h-8 bg-blue-400 rounded-md mb-3 border-b-4"
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrder}
                  >
                    Place Order
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <h2 className="text-2xl font-serif text-blue-300">
          Here you can place all products order :{" "}
        </h2>
        <p>Total price : ₹{itemsPrice.toFixed(2)}</p>
        <p>Shipping : ₹{shippingPrice.toFixed(2)} </p>
        <p>Tax : ₹{taxPrice}</p>
        <p>Total : ₹{totalPrice}</p>
        <p>{error && <Message variant="danger">{error}</Message>}</p>
        <button
          type="submit"
          className="border w-36 h-8 bg-blue-400 rounded-md border-b-4"
          disabled={cart.cartItems.length === 0}
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
