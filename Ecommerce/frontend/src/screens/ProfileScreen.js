import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../redux/slices/userSlice";
import { listMyOrders, getOrderDetails } from "../redux/slices/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
function ProfileScreen({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userDetails, loading, error } = user;
  const userData = {
    id: userDetails._id,
    name: name,
    email: email,
    password: password,
  };
  const navigate = useNavigate();

  const order = useSelector((state) => state.order);
  const { listorder, loading: loadingOrders, error: errorOrders } = order;

  useEffect(() => {
    if (!userDetails) {
      navigate("/login");
    } else {
      dispatch(listMyOrders());

      setName(userDetails.name);
      setEmail(userDetails.username);
    }
  }, [dispatch, history, userDetails, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUser(userDetails.id, userData));
      navigate("/");
      setMessage("");
    }
  };

  const handleDeleteUser = () => {
    // Call the deleteUser action from userSlice
    dispatch(deleteUser(userDetails.id));
    navigate("/");
    window.location.reload();
     // Reload the page
  };
  return (
    <>
    
      <form
        onSubmit={submitHandler}
        className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white"
      >
        <h2 className="text-xl font-bold mb-4">User Profile</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
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
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
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
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
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
          <label htmlFor="confirm-password" className="block text-gray-700">
            Confirm Password
          </label>
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
          Update
        </button>
        <Link to="/">
          <button
            type="homescreen"
            className="w-full bg-blue-500 text-white my-4 p-2 rounded-lg hover:bg-blue-600"
          >
            Home Screen
          </button>
        </Link>
      </form>
    

      <div className="flex justify-center align-center">
      <button
        type="submit"
        variant="danger"
        className="w-[450px] flex justify-center align-middle border p-3 bg-red-400 hover:bg-red-600 rounded-lg "
        onClick={handleDeleteUser}
      >
        <div style={{ fontSize: "18px" }}> Delete Account </div>
      </button>
      </div>
    </>
  );
}

export default ProfileScreen;
