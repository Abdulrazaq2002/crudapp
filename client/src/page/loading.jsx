import React from "react";

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
      {/* Centered container */}
      <span>
        <button
          type='button'
          className='bg-black text-white font-semibold px-4 py-2 rounded-md'
          disabled>
          <svg
            className='animate-spin h-5 w-5 mr-3 text-white'
            viewBox='0 0 24 24'>
            {/* Your SVG content here */}
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm2-9.456V2c-3.313 0-6 2.687-6 6h4c0-1.657 1.343-3 3-3z'></path>
          </svg>
          Processing...
        </button>
      </span>
    </div>
  );
}
