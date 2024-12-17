import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import brand from "../images/brand.jpg"

import SearchBox from "./SearchBox";
import CartScreen from "../screens/CartScreen";
import { login } from "../redux/slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;
 

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      {/* Logo or Brand Name */}
      <div className="text-white text-xl font-bold"><img src={brand} alt="notfound" style={{
                height: 50,
                borderRadius: 25,
                
              }}></img></div>

      {/* Search Box */}
      <div className="flex flex-1 mx-4 max-w-lg">
              <SearchBox />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        {userDetails ? (
          <> <Link to={"/profile"}>
              <button className="text-white">
                <FontAwesomeIcon icon={faUser} size="lg" />
              </button>
            </Link>
           
          </>
        ) : (
          <div>
            <Link to="/register">
              <button className="text-white">
                <FontAwesomeIcon icon={faUser} size="lg" />
              </button>
            </Link>
          </div>
        )}
        <Link to={'/cart/:id?'}>
        
        <button className="text-white">
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        </button>
        </Link>
      </div>
    </nav>
  );
};
export default Header;

{
  /*<div>
      {/*<AppBar position="static" className={classes.appBar}  >
        <Toolbar>
          <Link to="/" className={classes.link}>
            <img
              src={logo}
              alt="FooTshop"
              style={{
                height: 60,
              }}
            />
          </Link>
          <div style={{ marginLeft: "5vw" }}>
            <SearchBox />
          </div>
          <div>
          
          <a href="#"><i className="fa fa-fw fa-search"></i>Search</a>
          <div>
            <a href="#"><i className="fa-solid fa-cart-shopping"></i></a>
          </div>
          </div>
          {console.log(userDetails)}
          {userDetails ? (
            <>
             <h1><i className="fa-solid fa-user"></i></h1>
              <select
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleMenuClose}
              >
                <option
                  component={Link}
                  to="/profile"
                  onClick={handleMenuClose}
                >
                  Profile
                </option>

                <option onClick={handleLogout}>
                  Logout
                </option>
              </select>
            </>
          ) : (
            <div>
              <div
                aria-label="login"
                color="inherit"
                component={Link}
                to="/login"
                
              >
                <span><i className="fa-regular fa-user"></i></span>
              </div>
            </div>
          )}
        
    </div>*/
}
