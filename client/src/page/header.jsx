import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <ul className='flex justify-around bg-white border-b border-black p-2'>
      <li>
        <Link to='/' className='hover:underline'>
          <img
            className='size-6 md:size-10 hover:size-9'
            src='https://cdn-icons-png.flaticon.com/512/1946/1946488.png'
            alt='Home'
          />
        </Link>
      </li>
      <li>
        <Link to='/postquotes'>
          {/* <h1 className='text-3xl -mt-2 w-10 h-10 text-center text-black rounded-lg border border-black hover:text-white hover:bg-black flex items-center justify-center'> */}
          <img
            src='https://static.thenounproject.com/png/2818902-200.png'
            className='size-6 md:size-10 hover:size-9'
            alt='Post'
          />
          {/* </h1> */}
        </Link>
      </li>
      <li>
        <Link to='/search' className='text-xl text-black hover:underline'>
          <img
            src='https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png'
            className='size-6 md:size-10 hover:size-9'
            alt='Post'
          />
        </Link>
      </li>
    </ul>
  );
}
