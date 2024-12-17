import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { fetchTopRatedProducts } from "../redux/slices/productSlice";

function ProductCarousel() {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };
  const topRatedProducts = useSelector(
    (state) => state.product.topRatedProducts
  );
  const { error, loading, products } = topRatedProducts;
  useEffect(() => {
    dispatch(fetchTopRatedProducts());
  }, [dispatch]);

  

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((product) => {
          
          const imageUrl = product.image ? `http://127.0.0.1:8000${product.image}` : '/path/to/default/image.jpg';
          
          return (
          <div key={product._id} className="min-w-full flex-shrink-0">
            <Link to={`/product/${product.id}`}>
            
              <img
                src = {imageUrl}
                alt={product.name}
                className="w-full h-64 object-contain"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">
                  {product.name} {product.price}
                </h3>
              </div>
            </Link>
          </div>
        
        )}
      )}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
      >
        &gt;
      </button>
    </div>
  );
}

export default ProductCarousel;
