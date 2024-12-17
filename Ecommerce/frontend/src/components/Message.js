import React from 'react';
import PropTypes from 'prop-types';

const variants = {
  success: 'bg-green-500 border-green-600 text-white',
  error: 'bg-red-500 border-red-600 text-white',
  warning: 'bg-yellow-500 border-yellow-600 text-white',
  info: 'bg-blue-500 border-blue-600 text-white',
};

const Message = ({ variant, children }) => {
  const variantClasses = variants[variant] || variants.info;

  return (
    <div className={`border-l-4 p-4 rounded-md ${variantClasses}`}>
      {children}
    </div>
  );
};

Message.propTypes = {
  variant: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  children: PropTypes.node.isRequired,
};

export default Message;
