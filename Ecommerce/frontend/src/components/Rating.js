import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import PropTypes from 'prop-types';

function Rating({ value, text, color }) {
  const starColor = color || "text-yellow-500"; // Default color if none provided

  return (
    <div className="flex items-center">
      <div className="flex mr-2">
        <div className="mr-1">
          {value >= 1 ? (
            <FaStar className={starColor} size={20} />
          ) : value >= 0.5 ? (
            <FaStarHalfAlt className={starColor} size={20} />
          ) : (
            <FaRegStar className={starColor} size={20} />
          )}
        </div>

        <div className="mr-1">
          {value >= 2 ? (
            <FaStar className={starColor} size={20} />
          ) : value >= 1.5 ? (
            <FaStarHalfAlt className={starColor} size={20} />
          ) : (
            <FaRegStar className={starColor} size={20} />
          )}
        </div>

        <div className="mr-1">
          {value >= 3 ? (
            <FaStar className={starColor} size={20} />
          ) : value >= 2.5 ? (
            <FaStarHalfAlt className={starColor} size={20} />
          ) : (
            <FaRegStar className={starColor} size={20} />
          )}
        </div>

        <div className="mr-1">
          {value >= 4 ? (
            <FaStar className={starColor} size={20} />
          ) : value >= 3.5 ? (
            <FaStarHalfAlt className={starColor} size={20} />
          ) : (
            <FaRegStar className={starColor} size={20} />
          )}
        </div>

        <div className="mr-1">
          {value >= 5 ? (
            <FaStar className={starColor} size={20} />
          ) : value >= 4.5 ? (
            <FaStarHalfAlt className={starColor} size={20} />
          ) : (
            <FaRegStar className={starColor} size={20} />
          )}
        </div>
      </div>

      {text && (
        <span className="text-gray-600 text-sm">
          {text}
        </span>
      )}
    </div>
  );
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;
