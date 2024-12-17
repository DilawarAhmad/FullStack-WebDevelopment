import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex space-x-4 text-gray-600">
      <Link
        to="/login"
        className={`relative px-4 py-2 ${step1 ? 'text-blue-600 font-semibold' : 'text-gray-400'} hover:text-blue-800`}
      >
        {step1 ? "Login" : "Login (Incomplete)"}
        {!step1 && <span className="absolute right-0 top-0 text-red-500 text-sm">✗</span>}
      </Link>

      <Link
        to="/shipping"
        className={`relative px-4 py-2 ${step2 ? 'text-blue-600 font-semibold' : 'text-gray-400'} hover:text-blue-800`}
      >
        {step2 ? "Shipping" : "Shipping (Incomplete)"}
        {!step2 && <span className="absolute right-0 top-0 text-red-500 text-sm">✗</span>}
      </Link>

      <div
        className={`relative px-4 py-2 ${step3 ? 'text-blue-600 font-semibold' : 'text-gray-400'} ${step3 ? '' : 'opacity-50'}`}
      >
        {step3 ? "Place Order" : "Place Order (Incomplete)"}
        {!step3 && <span className="absolute right-0 top-0 text-red-500 text-sm">✗</span>}
      </div>
    </div>
  );
};

export default CheckoutSteps;


{/*import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    color: theme.palette.grey[600],
    textDecoration: "none",
  },
  activeLink: {
    color: theme.palette.primary.main,
  },
}));

function CheckoutSteps({ step1, step2, step3  }) {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        to="/login"
        className={`${classes.link} ${step1 ? classes.activeLink : ""}`}
      >
        {step1 ? "Login" : "Login (Incomplete)"}
      </Link>

      <Link
        to="/shipping"
        className={`${classes.link} ${step2 ? classes.activeLink : ""}`}
      >
        {step2 ? "Shipping" : "Shipping (Incomplete)"}
      </Link>

   
      <Typography
        color={step3 ? "textPrimary" : "textSecondary"}
        className={`${classes.link} ${step3 ? classes.activeLink : ""}`}
      >
        {step3 ? "Place Order" : "Place Order (Incomplete)"}
      </Typography>
     
    </Breadcrumbs>
  );
}

export default CheckoutSteps;*/}