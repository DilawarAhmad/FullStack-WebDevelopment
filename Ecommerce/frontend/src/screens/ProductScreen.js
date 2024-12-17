import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductDetails,
  createReview,
} from "../redux/slices/productSlice";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/slices/cartSlice";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.product.productDetails);
  const { product, loading, error } = productDetails;
  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;
  const imageUrl = product.image
    ? `http://127.0.0.1:8000${product.image}`
    : "/path/to/default/image.jpg";

  const productReviewCreate = useSelector(
    (state) => state.product.createReview
  );
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;
  useEffect(() => {
    // IF REVIEW SUCCESSFULLY SUBMITTED, RESET
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id, successProductReview]);
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
    dispatch(addToCart(id, qty));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(id, { rating, comment }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 pt-2 border rounded-lg shadow-lg bg-white">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="warning">{error}</Message>
      ) : (
        <div>
          <img src={imageUrl} alt={product.name} fluid />

          <strong>
            <h1>Name : {product.name}</h1>
          </strong>

          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color={"#f8e825"}
          />
          <p>
            <strong>Price: </strong>₹{product.price}
          </p>
          <p>Description: {product.description}</p>
          <p>
            <strong>Status:</strong>{" "}
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          {product.countInStock > 0 && (
            <p>
              Quantity :
              <Form.Control
                style={{ border: "2px solid black" }}
                as="select"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </Form.Control>
            </p>
          )}
          <button
            onClick={addToCartHandler}
            className=" bg-blue-400 border cursor-pointer rounded-xl p-3 mb-1 w-36 text-center"
            type="button"
            disabled={product.countInStock === 0}
          >
            Add to Cart
          </button>

          <h1>
            <strong>Reviews :</strong>
          </h1>
          {product.reviews.length === 0 && <Message>No reviews</Message>}

          {product.reviews.map((review) => (
            <div key={review._id}>
              <strong>Reviewer : {review.name}</strong>
              <Rating color={"#f8e825"} value={review.rating} />
              <p>
                <strong>Date :</strong>
                {review.createdAt.substring(0, 10)}
              </p>
              <p>
                <strong>Commet :</strong>
                {review.comment}
              </p>
            </div>
          ))}

          <h1>
            <strong>Write a Review :</strong>
          </h1>

          {userDetails ? (
            <form onSubmit={submitHandler}>
              <Form.Group controlId="rating">
                <label>Rating : </label>
                  <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </Form.Group>
              <Form.Group controlId="comment">
                <h1>
                  <strong>Commet : </strong>
                </h1>
                <Form.Control
                  as="textarea"
                  rows="2"
                  cols="20"
                  className="border mt-2 rounded-md"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <button
                disabled={loadingProductReview}
                type="submit"
                variant="primary"
                className=" bg-blue-500 cursor-pointer border rounded-xl p-3 mb-1 w-36 text-center"
              >
                Submit
              </button>
            </form>
          ) : (
            <Message>
              Please <Link to="/login">sign in</Link> to write a review
            </Message>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
