import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  const imageUrl = product.image ? `http://127.0.0.1:8000${product.image}` : '/path/to/default/image.jpg';
  
  return (
    <div className="max-w-xs mx-2 my-3 bg-white shadow-md rounded-lg overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-40 transition-transform duration-300 ease-in-out object-contain hover:scale-110"
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <div className="mb-2">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color="#f8e825"
            />
          </div>
          <p className="text-xl font-bold">₹{product.price}</p>
        </div>
     </Link>
    </div>
  );
}
export default Product;
