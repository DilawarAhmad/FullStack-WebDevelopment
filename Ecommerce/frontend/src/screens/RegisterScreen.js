
import React, { useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/slices/userSlice";

function RegisterScreen({}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetails, loading, error } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(createUser( name, email, password ));
      if (userDetails){
        navigate('/login')
      }
      
    }
  };
 

  return (
      <form onSubmit={submitHandler} className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      
      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Email Field */}
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

      {/* Password Field */}
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

      {/* Confirm Password Field */}
      <div className="mb-4">
        <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterScreen;
