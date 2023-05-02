import React from 'react';
import '../styles/tailwind.css';

function Loader() {
  return (
    <div className='flex justify-center'>
      <img
        id='gwloading-spinner'
        className='h-full'
        height='32px'
        width='32px'
        alt='loading...'
      />
    </div>
  );
}

export default Loader;
