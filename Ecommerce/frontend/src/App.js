
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
// import UserListScreen from "./screens/UserListScreen";
// import UserEditScreen from "./screens/UserEditScreen";
// import ProductListScreen from "./screens/ProductListScreen";
// import ProductEditScreen from "./screens/ProductEditScreen";
// import OrderListScreen from "./screens/OrderListScreen";

/* REACT ROUTER */
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Star from "./components/star";

function App() {
  return (
    <Router>
      {/* <Route exact path="/">
        <Redirect to="/page/1" />
      </Route> */}
     <div  style={{ position:"sticky",top: 0, zIndex: "100" }} ><Header /></div> 
     <Routes>
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route exact path="/" element={<HomeScreen />} />
      <Route path="/shipping" element={<ShippingScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart/:id?" element={<CartScreen />} />
      <Route path="/payment" element={<PaymentScreen />} />
      <Route path="/placeorder" element={<PlaceOrderScreen />} />
      <Route path="/orderDetail" element={<OrderScreen />} />
      {/*<Route path="/page/:pageNumber" element={<HomeScreen />} />*/}
      

     </Routes>
     <Footer />
    </Router>
  );
}

export default App;
{/*
  <Routes>
        <main className="py-3">
          
         

          

          
          

          

          
          


          {/* <Route path="/admin/userlist" component={UserListScreen} /> */}

          {/* <Route path="/admin/user/:id/edit" component={UserEditScreen} /> */}

          {/* <Route path="/admin/product/:id/edit" component={ProductEditScreen} /> */}

          {/* <Route path="/admin/productlist" component={ProductListScreen} /> */}

          {/* <Route path="/admin/orderlist" component={OrderListScreen} /> */}
          {/*</main>
          </Routes>
         */}