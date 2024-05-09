import React from 'react';

const Button = ({ onClick, children, className, subscribed }: any) => {
  return (
    <button
      onClick={onClick}
      className={subscribed?(`bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ${className}`):(`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${className}`)}
      >
      {children}
    </button>
  );
}

export default Button;