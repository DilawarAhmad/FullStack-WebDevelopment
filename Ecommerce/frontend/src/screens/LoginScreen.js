
import React, { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  login
} from "../redux/slices/userSlice";

function LoginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userDetails, loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    navigate("/")
  };

  return (
    <>
      {userDetails ? (
        <div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg my-4"
              >
              Login
              
              </button>
            </form>
          </div>
      ) : (
        <div>
            <Link to="/register/" />
        </div>
      )}
    </>
  );
}

export default LoginScreen;
