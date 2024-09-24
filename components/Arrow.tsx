import React from 'react';

const Arrow = ({ open }: {open: boolean}) => {
  return (
    <div className={`w-[18px] transition-transform ease duration-300 ${open && 'rotate-180'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M6 10L16 20 26 10"
        />
      </svg>
    </div>
  );
};

export default Arrow;
