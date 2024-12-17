import React, { useState } from "react";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";

import { saveShippingAddress } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

function ShippingScreen() {
  // PULLING OUT SHIPPING ADDRESS FROM CART
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;
  const navigate= useNavigate();

  // STATE
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  // HANDLERS
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );

    navigate("/payment");
  };
  
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      {/* Form */}
      <h1 className="text-2xl font-bold mb-6">Shipping</h1>
        <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
            <input
              id="city"
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-2">Postal Code</label>
            <input
              id="postalCode"
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="country" className="block text-gray-700 font-medium mb-2">Country</label>
            <input
              id="country"
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Continue
          </button>
        </form>
    </FormContainer>
  );
}

export default ShippingScreen;