import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import {
  fetchProductList,
} from "../redux/slices/productSlice";
import { useLocation } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();

  const productList = useSelector((state) => state.product.productList);
  const topRatedProducts = useSelector(
    (state) => state.product.topRatedProducts
  );

  const { products, loading, error } = productList;
  let keyword = location.search;
  useEffect(() => {
    dispatch(fetchProductList(keyword));
  }, [dispatch,keyword]);
 

  return (
    <div>
        {!keyword &&(
        <>
        <div
          className="text-center font-sans text-3xl text-blue-400"
        >
          TOP-RATED PRODUCTS
        </div>
        <ProductCarousel />
        </>
        )}
      
      <div
        className="text-center font-sans text-3xl text-blue-400"
      >
        LATEST PRODUCTS
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="warning">{error}</Message>
      ) : (
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;

//  <Paginate page={page} pages={pages} keyword={keyword} />*/}
