import React from 'react';

const Button = ({ onClick, children, className }: any) => {
  return (
    <button
      onClick={onClick}
      className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${className}`}
      >
      {children}
    </button>
  );
}

export default Button;