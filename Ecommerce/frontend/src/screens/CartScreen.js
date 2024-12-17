import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { removeFromCart } from "../redux/slices/cartSlice";

function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <div className="flex max-w-3xl flex-col mx-auto justify-center p-6 pt-0 border rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-mono text-blue-300 text-center">
        Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <Message variant="info">
          Your cart is empty. <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <div>
          {cartItems.map((item) => {
            const imageUrl = item.image
              ? `http://127.0.0.1:8000${item.image}`
              : "/path/to/default/image.jpg";
            return (
              <div key={item.product}>
                <img src={imageUrl} alt={item.name} fluid rounded />
                <Link to={`/product/${item._id}`}>Name : {item.name}</Link>
                <p>Quantity : {item.qty}</p>
                <p>Price : ₹{item.price}</p>
                <button
                  type="button"
                  variant="light"
                  onClick={() => removeFromCartHandler(item._id)}
                  className="border w-36 h-8 bg-blue-400 rounded-lg"
                >
                  Remove
                </button>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                ₹
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
                <br />
                <button
                  type="submit"
                  className="border w-44 h-8 bg-lime-400 rounded-lg"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CartScreen;
